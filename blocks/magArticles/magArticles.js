import { createOptimizedPicture } from '../../scripts/aem.js';

async function getAllArticles(artURL) {
    const resp = await fetch(artURL);
    const json = await resp.json();
    console.log(json)
}

export default function decorate(block) {
const articles = block.querySelector('a[href$=".json"]');
const artURL = articles.href;
getAllArticles(artURL)
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
