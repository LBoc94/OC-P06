const storedToken = localStorage.token

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


// ---GALLERY---
// CREATION GALLERY
const gallery = document.querySelector(".gallery");

function generateWorks(works) {
    works.forEach(works => {
        let work = document.createElement("figure");
        work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}"><figcaption>${works.title}</figcaption>`;
        gallery.appendChild(work);
    })
}

// AJOUT TRAVAUX GALLERY
async function generateGallery() {
    let works = await getWorks();
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
    filterBtn.classList.add("filterbtn");
    filterBtn.setAttribute("id", categoryName[i]);
    filterBtn.textContent = categoryName[i];

    // GENERATION DES FILTRES AU CLIC
    filterBtn.addEventListener("click", function() {
        const filteredWorks = works.filter(work => work.category.name === filterBtn.textContent)

        gallery.innerHTML = ""
        if (filterBtn.textContent === "Tous") {
            generateWorks(works)
        } else {
            generateWorks(filteredWorks)
        }       
        
        
        // filterBtn.classList.add("filterbtnactive")
    })
    }
}
generateFilters()



// const storedToken = localStorage.getItem("token");
// console.log(storedToken)
const logout = document.getElementById("headerlogin")

if (storedToken) {
     logout.innerText = "logout"
}

// // LOGING OUT
// if (logout.innerText === "logout") {
//     logout.addEventListener("click", () => {
//         localStorage.removeItem("token")
//         window.location.href = "./index.html";
//     })
// }