const modalHeader = document.querySelector("#modal-header")
const modal = document.querySelector("#modal")
const modalAddForm = document.querySelector("#modal-content-form")
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

// EDITION MODE QUAND LOGGED IN
if (storedToken) {
    filters.classList.add("displaynone")

    createHeaderMod()
    modalHeader.classList.remove("displaynone")

    const introPicModif = document.querySelector(".intro-pic")
    createModifBtn(introPicModif, "modif-intro")

    const projectsModif = document.querySelector(".projects-header")
    createModifBtn(projectsModif, "modif-projects")
}



    ////--- MODALE ---////

// OUVERTURE MODALE
const projectsModifBtn = document.querySelector("#modif-projects")

projectsModifBtn.addEventListener("click", (e) => {
    e.preventDefault()
    modal.classList.remove("displaynone")
    modal.querySelector("#close-modal").addEventListener("click", modalClose)
    modal.querySelector(".modal-overlay").addEventListener("click", modalClose)

    modal.querySelector("#add-btn").addEventListener("click", addModal)
})

// FERMETURE MODALE
function modalClose(e) {
    e.preventDefault()
    modal.classList.add("displaynone")
    modalAddForm.classList.add("displaynone")
    modalGallery.classList.remove("displaynone")
    modal.querySelector("#close-modal").removeEventListener("click", modalClose)
    modal.querySelector(".modal-overlay").removeEventListener("click", modalClose)
    modal.removeEventListener("click", modalClose)
}

// GENERATION TRAVAUX MODALE
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

// GENERATION GALERIE MODALE
async function generateGalleryModal() {
    galleryModal.innerHTML=``
    let worksModal = await getWorks();
    generateWorksModal(worksModal)
    deleteWork(worksModal)
}
generateGalleryModal()



    ////--- DELETE WORKS ---////

//----- FETCH API DELETE -----//
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
            console.log("appel réussi")
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
async function deleteWork(workId) {
    await deleteFetch(workId)
    await getWorks()
    const deleteBtns = document.querySelectorAll(".deleteBtn")
    let figureModal = document.querySelectorAll("#modal-gallery figure")

        deleteBtns.forEach((deleteBtn) =>
            deleteBtn.addEventListener("click", () => {        
                let getId = deleteBtn.id
                workId = getId

                for (let figure of figureModal) {
                    if(deleteBtn.id === figure.id) {
                        console.log("Suppression réussie")
                        deleteFetch(workId)
                        figure.remove()
                        generateGallery()
                    }}
            })
        )
        

    // SUPPRESSION GALERIE COMPLETE
    const deleteAllBtn = document.querySelector("#delete-txt")

    deleteAllBtn.addEventListener("click", () => {
        if (window.confirm("Supprimer toute la galerie ?")) {
            for (let figure of figureModal) {
                workId = figure.id;
                deleteFetch(workId);
                figure.remove();
            }

            figureModal = [];
            generateGallery()
        }
    });
}


    ////--- ADD WORKS ---////

// AFFICHAGE ADD MODAL
function addModal() {
    modalGallery.classList.add("displaynone")
    modalAddForm.classList.remove("displaynone")

    document.getElementById("back-modal").addEventListener("click", () => {
        modalGallery.classList.remove("displaynone")
        modalAddForm.classList.add("displaynone")
    })
}

// FETCH API CATEGORIES
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

// GENERATION OPTIONS CATEGORIES DANS FORM
async function sendCategories() {
    let categories = await getCategories()
    addCategories(categories)
}
sendCategories()

function addCategories(categories) {
    const catsForm = document.querySelector("#category")

    categories.forEach(categories => {
        let category = document.createElement("option");
        category.value = `${categories.id}`;
        category.innerText = `${categories.name}`;
        catsForm.appendChild(category);;
    })
}


// FETCH API POST
async function postWorks(formData) {
    try {
        const url = `http://localhost:5678/api/works`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${storedToken}`,
                "Accept": "application/json",
            },
            body: formData,
        });

    // REPONSE STATUT OK
        if (response.status === 201) {
            console.log("Succès de l'ajout")
            
    // REPONSE STATUT ERREURS
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

// INPUT IMAGE PREVIEW + MAXSIZE
const fileInput = document.querySelector("#fileInput")
fileInput.addEventListener("change", function(e) {
    
    if (e.target.files[0].size > 4 * 1024 * 1024) {
        alert("Fichier trop volumineux.")
    } else if(e.target.files.length > 0){
        let previewBlock = document.querySelector(".mod-add-block")
        const imgPreview = document.createElement("img")
        imgPreview.setAttribute("class", "img-preview")
        imgPreview.src = URL.createObjectURL(e.target.files[0])
        previewBlock.appendChild(imgPreview)
    }
})

// INPUT BUTTON COLOR CHANGE
function inputBtnColorChange() {
    let fileInputImg = fileInput.files[0]
    let title = document.querySelector("#title").value
    let category = document.querySelector("#category").value
    let btnchange = document.querySelector("#mod-submit")

    if (fileInputImg && title !== `` && category !== `no-value`) {
        btnchange.style.backgroundColor = "#1D6154"
    }
}
document.querySelector("#title").addEventListener("input", inputBtnColorChange)
document.querySelector("#category").addEventListener("change", inputBtnColorChange)
document.querySelector("#fileInput").addEventListener("change", inputBtnColorChange)

// ENVOI WORK
function sendWork() {

     modForm.addEventListener("submit", async function(e) {
        e.preventDefault()
        let fileInputImg = fileInput.files[0]
        let title = document.querySelector("#title").value
        let category = document.querySelector("#category").value

        if(category === "no-value" || title === "" || !fileInput.files[0]){
            alert("Veuillez renseigner tous les champs.")
        } else {
        const formData = new FormData();
        formData.append("image", fileInputImg);
        formData.append("title", title);
        formData.append("category", category)

        postWorks(formData)
        await getWorks()
        await generateGallery()
        await generateGalleryModal()
        modalClose(e)
        formReset()
        }
     })
 
 }
sendWork()

// FORM RESET
function formReset() {
    modForm.reset()
    document.querySelector(".img-preview").src = ""
}