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

// let copyElementsFromGallery = document.querySelectorAll(".gallery figure img")
// console.log(copyElementsFromGallery)
//   copyElementsFromGallery.forEach()

async function generateGalleryModal() {
    // galleryModal.innerHTML=""
    let worksModal = await getWorks();
    generateWorksModal(worksModal)
    // testdelete(worksModal)
    // deletetestgh(worksModal)
    deletetest3(worksModal)
}
generateGalleryModal()



//-------------------
// modifBtns.forEach(btn => btn.addEventListener ("click", testfctn))

// function testfctn() {
//     console.log("testfctn running")
// }


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
    }   }


// FONCTION DELETE
    async function deletetest3(worksModal, workId) {
        await deleteFetch(workId)
        const deleteBtns = document.querySelectorAll(".deleteBtn")
        let figureModal = document.querySelectorAll("#modal-gallery figure")
        let figuregallery = document.querySelectorAll(".gallery figure")
        console.log(figuregallery)
        // console.log(figureModal[1].id)
    
        
        deleteBtns.forEach((deleteBtn) =>
            deleteBtn.addEventListener("click", () => {
                console.log(deleteBtn.id)
    
                // console.log("deletetest3")
                // console.log(e.target.id)
                // console.log(worksModal.target.id)
    
                let getId = deleteBtn.id
                workId = getId
                console.log(workId)
                // workId.remove()


                // for (let worktest of worksModal) {
                // if(workId === worktest.id) {
                //     console.log("working")
                //     workId.remove()
                // } else {
                //     console.log("not working")
                // }}


                for (let figuretest of figureModal) {
                    if(deleteBtn.id === figuretest.id) {
                        console.log("Suppression réussie")
                        deleteFetch(workId)
                        figuretest.remove()
                        // figuretestbis.remove()


                    } else {
                        console.log("not working")
                    }}


                // let testbtndelete = deleteBtn.id
                // figureModal[testbtndelete].remove()
 
        }))



// const deleteBtns = document.getElementsByClassName("deleteBtn")

// async function testdelete(worksModal) {
//     const deleteBtns = document.querySelectorAll(".deleteBtn")

//     console.log(deleteBtns)

//     deleteBtns.forEach((deleteBtn) =>
//         deleteBtn.addEventListener("click", (i) => {
//             console.log("test testdelete")
//             console.log(worksModal[i].id)
//     }))
// }




// async function deletetestgh(worksModal) {
//     const deleteBtns = document.querySelectorAll(".deleteBtn")
//     let figureModal = document.querySelectorAll("#modal-gallery figure")
//     console.log(figureModal)
    

//     for (let deleteBtn of deleteBtns) {
//         deleteBtn.addEventListener("click", function() {
//             console.log("test deleteBtn")
//             const workId = worksModal.id;
//             const workIdBtn = deleteBtn.id;
//             console.log(workIdBtn)

//             deleteFetch(workId);

//             for (let figure of figureModal) {
//                 console.log(figure)
//                 if (workIdBtn === workId) {
//                     figure.remove();
//                 }
//             }
//         })
//     }
// }


    // for (let deleteBtn of deleteBtns) {
    //     deleteBtn.addEventListener("click", function() {
    //         console.log("test deleteBtn")
    //         const workId = worksModal.id;
    //         const workIdBtn = deleteBtn.id;
    //         console.log(workIdBtn)

    //         deleteFetch(workId);

    //         for (let figure of figureModal) {
    //             console.log(figure)
    //             if (workIdBtn === workId) {
    //                 figure.remove();
    //             }
    //         }
    //     })
    // }
}


// appui poubelle > get id de l'image > delete l'item dans l'api > delete l'affichage dans modal ? > refresh modal (appel fonction) > pas de refresh page



//----- ADD -----//

//<option value="">--Please choose an option--</option>
//<option value="dog">Dog</option>