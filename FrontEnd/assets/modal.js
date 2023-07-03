const modalHeader = document.getElementById("modal-header")
const modal = document.getElementById("modal")
const projetctTitle = document.getElementById("project-title")
const introPic = document.querySelector("figure")
const projectsModifBtn = document.getElementById("projects-modif")


// MODIFIER BTN
function createModifBtn(e) {
    let modifBtn = document.createElement("p")
    modifBtn.innerHTML = `<i class="fa-regular fa-pen-to-square modif-icon"></i>modifier`
    modifBtn.classList.add("modif-icon")
    e.appendChild(modifBtn);
}

// EDITION MODE - LOGGED IN
if (storedToken) {
    modalHeader.classList.remove("displaynone")
    filters.classList.add("displaynone")

    createModifBtn(introPic)
    createModifBtn(projectsModifBtn)
}


// APPARITION MODALE GALERIE
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






//-------------------
// modifBtns.forEach(btn => btn.addEventListener ("click", testfctn))

// function testfctn() {
//     console.log("wesh")
// }



// addEventListener("click", () {
//     console.log("bjr")
// })