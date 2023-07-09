const modalHeader = document.getElementById("modal-header")
const modal = document.getElementById("modal")
const projetctTitle = document.getElementById("project-title")
const introPic = document.querySelector("figure")
const projectsModifBtn = document.getElementById("projects-modif")


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
})

function modalClose(e) {
    e.preventDefault()
    modal.classList.add("displaynone")
    modal.querySelector("#close-modal").removeEventListener("click", modalClose)
    modal.querySelector(".modal-overlay").removeEventListener("click", modalClose)
    modal.removeEventListener("click", modalClose)
}


// GENERATION GALERIE MODALE
const galleryModal = document.getElementById("modal-gallery");

function generateWorksModal(worksModal) {

    worksModal.forEach(function(workModal, i) {
        let figureModal = document.createElement("figure");
        figureModal.id = "figureModal" + workModal.id;
        galleryModal.appendChild(figureModal);

        const imageModal = document.createElement("img");
        imageModal.src = workModal.imageUrl;
        figureModal.appendChild(imageModal);

        const figModalcaption = document.createElement("figcaption");
        figModalcaption.innerText = "éditer";
        figureModal.appendChild(figModalcaption);


        const boutonDeplacement = document.createElement("button");
        boutonDeplacement.className = "boutonDeplacement";
        boutonDeplacement.id = i + 1;
        figureModal.appendChild(boutonDeplacement);

        const iconDeplacement = document.createElement("i");
        iconDeplacement.className = "fa-solid fa-arrows-up-down-left-right";
        boutonDeplacement.appendChild(iconDeplacement);
    
        // Création du bouton suppression dans la figure de la modale  
        const suppression = document.createElement("button");
        suppression.className = "boutonSuppression";
        //suppression.id = projet.id
        suppression.type = "submit";
        figureModal.appendChild(suppression);

        const iconSuppression = document.createElement("i");
        iconSuppression.className = "fa-solid fa-trash-can";
        //iconSuppression.src = "assets/icons/trash-can-solid.svg"
        suppression.appendChild(iconSuppression);

        console.log(figureModal.id)
    })

}

async function generateGalleryModal() {
    // galleryModal.innerHTML=""
    let worksModal = await getWorks();
    generateWorksModal(worksModal)
}
generateGalleryModal()





//-------------------
// modifBtns.forEach(btn => btn.addEventListener ("click", testfctn))

// function testfctn() {
//     console.log("wesh")
// }



// addEventListener("click", () {
//     console.log("bjr")
// })



//----- DELETE -----//
