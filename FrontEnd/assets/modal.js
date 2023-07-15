const modalHeader = document.getElementById("modal-header")
const modal = document.getElementById("modal")
const projetctTitle = document.getElementById("project-title")
const introPic = document.querySelector("figure")
const projectsModifBtn = document.getElementById("projects-modif")
const modalGallery = document.getElementById("modal-content-gallery")
const modalAddForm = document.getElementById("modal-content-form")
const modalBackBtn = document.getElementById("back-modal")


// BTN MODIFIER GENERATION
function createModifBtn(e) {
    let modifBtn = document.createElement("p")
    modifBtn.innerHTML = `<i class="fa-regular fa-pen-to-square modif-icon"></i>modifier`
    modifBtn.classList.add("modif-icon")
    e.appendChild(modifBtn);
}

// EDITION MODE WHEN LOGGED IN
if (storedToken) {
    modalHeader.classList.remove("displaynone")
    filters.classList.add("displaynone")

    createModifBtn(introPic)
    createModifBtn(projectsModifBtn)
}


// OUVERTURE MODALE
projectsModifBtn.addEventListener("click", (e) => {
    e.preventDefault()
    modal.classList.remove("displaynone")
    modal.querySelector("#close-modal").addEventListener("click", modalClose)
    modal.querySelector(".modal-overlay").addEventListener("click", modalClose)

    modal.querySelector("#add-btn").addEventListener("click", addModal)
})

function modalClose(e) {
    e.preventDefault()
    modal.classList.add("displaynone")
    modalAddForm.classList.add("displaynone")
    modalBackBtn.classList.add("displaynone")
    modalGallery.classList.remove("displaynone")
    modal.querySelector("#close-modal").removeEventListener("click", modalClose)
    modal.querySelector(".modal-overlay").removeEventListener("click", modalClose)
    modal.removeEventListener("click", modalClose)
}


// GENERATION GALERIE MODALE
const galleryModal = document.getElementById("modal-gallery");

function generateWorksModal(worksModal) {

    worksModal.forEach(function(workModal) {
        let figureModal = document.createElement("figure");
        figureModal.id = workModal.id;
        galleryModal.appendChild(figureModal);

        figureModal.innerHTML += `<img src="${workModal.imageUrl}">
        <figcaption>éditer</figcaption>
        <button class="moveBtn"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
        <button class="deleteBtn" id="${workModal.id}" type="submit"><i class="fa-solid fa-trash-can"></i></button>`
    })

}

async function generateGalleryModal() {
    // galleryModal.innerHTML=""
    let worksModal = await getWorks();
    generateWorksModal(worksModal)
    deletetest3(worksModal)
}
generateGalleryModal()



//----- DELETE -----//
async function deleteFetch(workId) {
    try {
        const url = `http://localhost:5678/api/works/${workId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${storedToken}`,
                "Accept": "application/json",
            }
        });

    // REPONSE STATUT OK
        if (response.status === 200) {
            console.log("test fetch delete")
            
    // // REPONSE STATUT ERREURS
        } else if (response.status === 401) {
            alert("Unauthorized.");
        } else if (response.status === 500) {
            alert("Unexpected Behavior.");
        }
    }
    // CATCH ERREURS
      catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
    }   
}


// FONCTION DELETE
async function deletetest3(worksModal, workId) {
    await deleteFetch(workId)
        const deleteBtns = document.querySelectorAll(".deleteBtn")
        let figureModal = document.querySelectorAll("#modal-gallery figure")
        let figuregallery = document.querySelectorAll(".gallery figure")
        console.log(figuregallery)


        deleteBtns.forEach((deleteBtn) =>
            deleteBtn.addEventListener("click", () => {
                console.log(deleteBtn.id)
        
                let getId = deleteBtn.id
                workId = getId
                console.log(workId)

                for (let figuretest of figureModal) {
                    if(deleteBtn.id === figuretest.id) {
                        console.log("Suppression réussie")
                        deleteFetch(workId)
                        figuretest.remove()
                    } else {
                        console.log("Échec de la supression")
                    }} 
            }))
}



//----- ADD -----//

function addModal() {
    modalGallery.classList.add("displaynone")
    modalAddForm.classList.remove("displaynone")
    modalBackBtn.classList.add("displaynone")
}


// AFFICHAGE CATEGORIES DEROULANT
async function getCategories() {
    try {
    const responseCats = await fetch ("http://localhost:5678/api/categories");
    if (responseCats.ok) {
        const catsData = await responseCats.json();
        return catsData    
    } else {
        console.error("Erreur HTTP: " + responseCats.status)
    }
    } catch (error) {
        console.error("Erreur lors de la récupération des données", error)
    }        
}

async function addCategories() {
    let categories = await getCategories()
    testcat(categories)
}
addCategories()

function testcat(categories) {
    const catsForm = document.getElementById("category")

    categories.forEach(categories => {
        let cat = document.createElement("option");
        cat.value = "${categories.name}";
        cat.innerText = `${categories.name}`;
        catsForm.appendChild(cat);;
    })
}