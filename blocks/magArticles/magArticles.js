import { createOptimizedPicture } from '../../scripts/aem.js';

async function getAllArticles(artURL) {
    const resp = await fetch(artURL);
    const json = await resp.json();
    const fData = json.data.filter((d)=>d.template==='Article')
    return fData
}

export default async function decorate(block) {
    
const articles = block.querySelector('a[href$=".json"]');
const artURL = articles.href;
const articleData = await getAllArticles(artURL)
const uli = document.createElement('ul');

articleData.forEach((d)=>{
    const li = document.createElement('li');
    const div1 = document.createElement('div')
    const pict = document.createElement('picture')
    const img =  document.createElement('img')
    const div2 = document.createElement('div')
    const h5 = document.createElement('h5')
    const desc = document.createElement('p')
    img.src = d.image
    pict.append(img) 
    h5.innerHTML = d.title;
    desc.innerHTML = d.description;
    // div1.append(pict);
    div2.append(h5);
    div2.append(desc);
    // const path = 'https://wknd.site/' + d.image;
    const pictureElement = createOptimizedPicture(d.image, d.title);
    div1.appendChild(pictureElement);

    li.append(div1);
    li.append(div2);
    uli.append(li);
})
const li = uli.querySelector('li');
[...li.children].forEach((div) => {
    if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
    else div.className = 'cards-card-body';
  });
  uli.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(uli);
}
