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

async function displayHeader(photographer) {
  const header = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const headerDOM = photographerModel.getHeaderDOM();

  header.prepend(headerDOM.infos);
  header.append(headerDOM.img);
}

async function displayPictures(pictures, photographerName) {
  const photoSection = document.querySelector(".photograph-photos-list");

  pictures.forEach((pic) => {
    const pictureModel = picturesFactory(pic, photographerName);
    const pictureCardDOM = pictureModel.getPicturesCardDOM();
    photoSection.appendChild(pictureCardDOM);
  });
}

async function displayAdditionalInfos(datas) {
  const { pictures, photographer } = datas;
  let totalLikes = 0;
  pictures.forEach((pic) => (totalLikes += pic.likes));

  const photographerModel = photographerFactory(photographer);
  const additionalInfosDOM =
    photographerModel.getAdditionalInfosDOM(totalLikes);

  const main = document.querySelector("main");
  main.append(additionalInfosDOM);
}

async function displayData(datas) {
  displayHeader(datas.photographer);
  displayPictures(datas.pictures, datas.photographer.name);
  displayAdditionalInfos(datas);
}

async function init() {
  const photographer = JSON.parse(window.sessionStorage.getItem("profil"));
  const pictures = await getPhotographerPictures(photographer.id);
  displayData({ photographer, pictures });
}
init();
