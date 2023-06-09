// RECUPERATION API
async function getWorks() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    works = await reponseWorks.json();
    return works;
}


// AJOUTS TRAVAUX A LA GALLERIE
const gallery = document.querySelector(".gallery");

async function generateGallery() {
    await getWorks();

    works.forEach(works => {
        let work = document.createElement("figure");
        work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
        gallery.appendChild(work);
    })
}
generateGallery()


// ---FILTRES---
const filters = document.querySelector(".filters");

async function generateFiltersBtns() {
    await getWorks();

    // RECUPERATION DES NOMS DE CATEGORIES
    let categoryNameSet = new Set();
    for (let i = 0; i < works.length; i++) {
        categoryNameSet.add("Tous")
        categoryNameSet.add(works[i].category.name)
    }
    let categoryName = [...categoryNameSet];

    // CREATION DES BOUTONS
    for (let i = 0; i < categoryNameSet.size; i++) {
    let filterBtn = document.createElement("button");
    filters.appendChild(filterBtn);
    filterBtn.classList.add("filterbtn");
    filterBtn.textContent = categoryName[i];
    }
}
generateFiltersBtns()