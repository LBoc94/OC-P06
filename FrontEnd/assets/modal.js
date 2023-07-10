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

        figureModal.innerHTML += `<img src="${workModal.imageUrl}">
        <figcaption>éditer</figcaption>
        <button class="boutonDeplacement"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
        <button class="boutonSuppression" type="submit"><i class="fa-solid fa-trash-can"></i></button>`
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
