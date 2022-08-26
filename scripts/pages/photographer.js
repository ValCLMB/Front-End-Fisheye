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
async function displayData(photographer) {
    const header = document.querySelector(".photograph-header")

    const photographerModel = photographerFactory(photographer.photographer);
    // header
    const headerDOM = photographerModel.getHeaderDOM();
    header.prepend(headerDOM.infos);
    header.append(headerDOM.img)


}

async function init() {
    const photographer = JSON.parse(window.sessionStorage.getItem("profil"));
    const pictures = getPhotographerPictures(photographer.id);
    displayData({photographer, pictures})
}
init();