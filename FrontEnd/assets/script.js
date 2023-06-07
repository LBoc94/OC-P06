// RECUPERATION API
async function getWorks() {
    const reponseWorks = await fetch("http://localhost:5678/api/works");
    works = await reponseWorks.json();
    return works;
}


// AJOUTS A LA GALLERIE
const gallery = document.querySelector(".gallery");

async function generateGallery() {
    const works = await getWorks()

    works.forEach(works => {
        let work = document.createElement("figure")
                 work.innerHTML += `<img src="${works.imageUrl}" alt="${works.title}">
         		<figcaption>${works.title}</figcaption>`;
                 gallery.appendChild(work);
    })
}

generateGallery()