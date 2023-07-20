const modalHeader = document.querySelector("#modal-header")
const modal = document.querySelector("#modal")
const modalAddForm = document.querySelector("#modal-content-form")
const modalBackBtn = document.querySelector("#back-modal")
const modalGallery = document.querySelector("#modal-content-gallery")
const modForm = document.querySelector("#mod-add-form")


    ////--- CREATION ENVIRONNEMENT MODALE ---////

// GENERATION BTN MODIFIER
function createModifBtn(e, id) {
    let modifBtn = document.createElement("p")
    modifBtn.setAttribute("id", id)
    modifBtn.innerHTML = `<i class="fa-regular fa-pen-to-square modif-icon"></i>modifier`
    e.appendChild(modifBtn);
}

// GENERATION HEADER
function createHeaderMod() {
    modalHeader.innerHTML += `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p><button class="headerbtn">publier les changements</button>`
}

// EDITION MODE WHEN LOGGED IN
if (storedToken) {
    filters.classList.add("displaynone")

    createHeaderMod()
    modalHeader.classList.remove("displaynone")

    const introPicModif = document.querySelector(".intro-pic")
    createModifBtn(introPicModif, "modif-intro")

    const projectsModif = document.querySelector(".projects-header")
    createModifBtn(projectsModif, "modif-projects")
}


// OUVERTURE MODALE
const projectsModifBtn = document.querySelector("#modif-projects")

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
const galleryModal = document.querySelector("#modal-gallery");

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
    galleryModal.innerHTML=``
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


// AFFICHAGE CATEGORIES
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
    const catsForm = document.querySelector("#category")

    categories.forEach(categories => {
        let cat = document.createElement("option");
        cat.value = `${categories.id}`;
        cat.innerText = `${categories.name}`;
        // cat.setAttribute("id", `${categories.id}`)
        // cat.setAttribute("class", "catformdatatest")
        catsForm.appendChild(cat);;
    })
}

// FETCH POST

async function postWorks(formData) {
    try {
        const url = `http://localhost:5678/api/works`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${storedToken}`,
                "Accept": "application/json",
                // "Content-Type": "multipart/form-data"
            },
            body: formData,
        });

    // REPONSE STATUT OK
        if (response.status === 201) {
            console.log("Succès de l'ajout.")
            
    // // REPONSE STATUT ERREURS
        } else if (response.status === 401) {
            alert("Non autorisé.");
        } else {
            alert("Erreur. Veuillez réessayer");
        }
    }
    // CATCH ERREURS
      catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer.");
    }   
}



// INPUT IMAGE - PREVIEW + MAXSIZE
const fileInput = document.querySelector("#fileInput")
fileInput.addEventListener("change", function(e) {
    
    if (e.target.files[0].size > 4 * 1024 * 1024) {
        alert("Fichier trop volumineux.")
        
    } else if(e.target.files.length > 0){
        
        let previewBlock = document.querySelector(".mod-add-block")
        previewBlock.innerHTML = ""

        const imgPreview = document.createElement("img")
        imgPreview.setAttribute("class", "testpreview")
        imgPreview.src = URL.createObjectURL(e.target.files[0])
        previewBlock.appendChild(imgPreview)
    }
})



// ENVOI WORK
//async 
function sendWork() {

    // await getWorks()
 
     modForm.addEventListener("submit", function(e) {
         e.preventDefault()
         let fileInputImg = fileInput.files[0]
         let title = document.querySelector("#title").value
         let category = document.querySelector("#category").value
         console.log(fileInputImg)
         console.log(title)
         console.log(category)
 

         if(category === "no-value" || title === "" || !fileInput.files[0]){
            alert("Veuillez renseigner tous les champs.")
        } else {
         const formData = new FormData();
         formData.append("image", fileInputImg);
         formData.append("title", title);
         formData.append("category", category)
         console.log(formData)
         postWorks(formData)
 
         // gallery.innerHTML = ``
         // galleryModal.innerHTML=``
         // generateGallery()
         // generateGalleryModal()
         modalClose(e)
        }
 
     })
 
 }
 sendWork()