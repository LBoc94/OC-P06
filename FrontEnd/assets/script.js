// RECUPERATION API
async function getWorks() {
    try {
    const responseWorks = await fetch ("http://localhost:5678/api/works");
    if (responseWorks.ok) {
        const worksData = await responseWorks.json();
        return worksData
    } else {
        console.error("Erreur HTTP: " + response.status)
    }
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
    }
}


// AJOUTS TRAVAUX A LA GALLERIE
const gallery = document.querySelector(".gallery");

async function generateGallery() {
    let works = await getWorks();

    works.forEach(works => {
        let work = document.createElement("figure");
        work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
        gallery.appendChild(work);
    })
}
generateGallery()



// ---FILTRES---
const filters = document.querySelector(".filters");

async function generateFilters() {
    let works = await getWorks();
    
    // RECUPERATION DES NOMS DE CATEGORIES
    let categoryNameSet = new Set();
    for (let i = 0; i < works.length; i++) {
        categoryNameSet.add("Tous");
        categoryNameSet.add(works[i].category.name);
    }
    let categoryName = [...categoryNameSet];

    // CREATION DES BOUTONS
    for (let i = 0; i < categoryName.length; i++) {
    let filterBtn = document.createElement("button");
    filters.appendChild(filterBtn);
    filterBtn.classList.add("filterbtn");
    filterBtn.setAttribute("id", categoryName[i]);
    filterBtn.textContent = categoryName[i];
    

    // GENERATION DES FILTRES
    filterBtn.addEventListener("click", function(event){
        const filteredWorks = works.filter(work => work.category.name === filterBtn.textContent)

        if (filterBtn.textContent === "Tous") {
            gallery.innerHTML = ""
            works.forEach(works => {
                let work = document.createElement("figure");
                work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
                gallery.appendChild(work);
                })
        } else {
            gallery.innerHTML = ""
            filteredWorks.forEach(works => {
                let work = document.createElement("figure");
                work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
                gallery.appendChild(work);
            })}       
                
        filterBtn.classList.add("filterbtnactive")
    })
    }
}
generateFilters()