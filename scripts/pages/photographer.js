//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerPictures(id) {
    let pictures = [];
    fetch('../../data/photographers.json')
        .then(res => res.json(res))
        .then(json => json.media.forEach(picture => {
            if(picture.photographerId === id) pictures.push(picture)
        }))
    return pictures;
}
async function displayPictures(pic) {
    const main = document.querySelector("main");

}

function displayPhotographer(photographer) {
    const header = document.querySelector(".photograph-header");
    const button = document.querySelector(".contact_button");
    const infos = document.createElement("section");
    const h1 = document.createElement("h1");
    const subInfos = document.createElement("div");

    // infos - left
    h1.textContent = photographer.name;

    const paragraphClasses = [
        {name:"location", value:`${photographer.city}, ${photographer.country}`},
        {name:"tagline", value:`${photographer.tagline}`},
    ]
    paragraphClasses.forEach(p => {
        let infosLine = document.createElement("p");
        infosLine.setAttribute("class",p.name);
        infosLine.textContent = p.value;
        subInfos.appendChild(infosLine)
    })


    infos.appendChild(h1)
    infos.appendChild(subInfos);
    header.insertBefore(infos, button)

    // picture - right
    const picture = photographer.portrait ?
        `assets/photographers/portrait/${photographer.portrait}` : "assets/photographers/account.png";
    const img = document.createElement("img");
    img.setAttribute("src",picture);
    img.setAttribute("alt", photographer.name);
    img.setAttribute("class","profil_pic");
    header.appendChild(img)

}
async function init() {
    const photographer = JSON.parse(window.sessionStorage.getItem("profil"));
    const pictures = getPhotographerPictures(photographer.id);
    displayPhotographer(photographer);
}
init();