const modalHeader = document.getElementById("modal-header")
const projetctTitle = document.getElementById("project-title")
const introPic = document.querySelector("figure")
console.log(introPic)


function createModifBtn(e) {
    let modifBtn = document.createElement("p")
    modifBtn.innerHTML = `<i class="fa-regular fa-pen-to-square modif-icon"></i>modifier`
    modifBtn.classList.add("modif-icon")
    e.appendChild(modifBtn);
}

if (storedToken) {
    console.log("test")
    modalHeader.classList.remove("displaynone")
    filters.classList.add("displaynone")

    createModifBtn(introPic)
    createModifBtn(projetctTitle)
}