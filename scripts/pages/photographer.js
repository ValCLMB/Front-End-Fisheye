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

  // photos
  const photoSection = document.querySelector(".photograph-photos-list");

  datas.pictures.forEach((pic) => {
    const pictureModel = picturesFactory(pic, datas.photographer.name);
    const pictureCardDOM = pictureModel.getPicturesCardDOM();
    photoSection.appendChild(pictureCardDOM);
  });

  // additional infos (like, price)
  let totalLikes = 0;
  datas.pictures.forEach((pic) => (totalLikes += pic.likes));
  const additionalInfosDOM =
    photographerModel.getAdditionalInfosDOM(totalLikes);
  main.append(additionalInfosDOM);
}

async function init() {
  const photographer = JSON.parse(window.sessionStorage.getItem("profil"));
  const pictures = await getPhotographerPictures(photographer.id);
  displayData({ photographer, pictures });
}
init();
