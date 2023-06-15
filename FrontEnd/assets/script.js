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

const gallery = document.querySelector(".gallery");

// AJOUTS TRAVAUX A LA GALLERIE
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

async function generateFiltersBtns() {
    let works = await getWorks();
    const filters = document.querySelector(".filters");

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
    filterBtn.textContent = categoryName[i];
        console.log(categoryName)

    filterBtn.addEventListener("click", (event) => {
        console.log(works[2].category.name)
        if (filterBtn.textContent === works[2].category.name) {
            console.log("test")
            
            filterBtn.classList.add("filterbtnactive")
            gallery.innerHTML = ""

            }
    })
    }

    // let filterbtntest = document.querySelectorAll(".filterbtn");
    // console.log(filterbtntest)

    

}
generateFiltersBtns()


async function testbtnfiltres() {
// TRI DES CATEGORIES
}