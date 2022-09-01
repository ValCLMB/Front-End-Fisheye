//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerPictures(id) {
  let pictures = [];
  await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((json) => {
      json.media.forEach((picture) => {
        if (picture.photographerId === id) pictures.push(picture);
      });
    });
  return pictures;
}
async function displayData(datas) {
  const main = document.querySelector("main");
  const header = document.querySelector(".photograph-header");

  const photographerModel = photographerFactory(datas.photographer);
  // header
  const headerDOM = photographerModel.getHeaderDOM();
  header.prepend(headerDOM.infos);
  header.append(headerDOM.img);
  // additional infos (like, price)
  const additionalInfosDOM = photographerModel.getAdditionalInfosDOM();
  main.append(additionalInfosDOM);

  // photos
  const photoSection = document.querySelector(".photograph-photos-list");

  datas.pictures.forEach((pic) => {
    const pictureModel = picturesFactory(pic, datas.photographer.name);
    const pictureCardDOM = pictureModel.getPicturesCardDOM();
    photoSection.appendChild(pictureCardDOM);
  });
}

async function init() {
  const photographer = JSON.parse(window.sessionStorage.getItem("profil"));
  const pictures = await getPhotographerPictures(photographer.id);
  displayData({ photographer, pictures });
}
init();
