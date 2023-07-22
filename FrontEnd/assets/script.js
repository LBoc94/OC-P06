const storedToken = localStorage.token
const gallery = document.querySelector("#gallery");


    ////--- RECUPERATION API ---////
async function getWorks() {
    try {
    const responseWorks = await fetch ("http://localhost:5678/api/works");
    if (responseWorks.ok) {
        const worksData = await responseWorks.json();
        return worksData    
    } else {
        console.error("Erreur HTTP: " + responseWorks.status)
    }
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
    }        
}


    ////--- GALLERY ---////
// CREATION TRAVAUX
function generateWorks(works) {
    works.forEach(works => {
        let work = document.createElement("figure");
        work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
        gallery.appendChild(work);
    })
}

// AJOUT TRAVAUX
async function generateGallery() {
    let works = await getWorks();
    gallery.innerHTML = ``
    generateWorks(works);
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
    filterBtn.classList.add("btn-base","filterbtn");
    filterBtn.setAttribute("id", categoryName[i]);
    filterBtn.textContent = categoryName[i];

    // TRAVAUX FILTRÉS AU CLIC
    filterBtn.addEventListener("click", function() {
        const filteredWorks = works.filter(work => work.category.name === filterBtn.textContent)

        gallery.innerHTML = ""
        if (filterBtn.textContent === "Tous") {
            generateWorks(works)
        } else {
            generateWorks(filteredWorks)
        }       
        
        document.querySelectorAll('.filterbtn').forEach(btn => btn.classList.remove('btnactive'))
        filterBtn.classList.add("btnactive");
    })
    }
}
generateFilters()


// LOG OUT
const logout = document.querySelector("#headerlogin")

if (storedToken) {
    logout.innerText = "logout"
    
    logout.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.href = "./index.html";
    })
}