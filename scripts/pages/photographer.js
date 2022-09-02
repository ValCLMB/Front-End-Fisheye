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

  pictures = filter(pictures, "date");

  document.querySelector("#photos-filter").addEventListener("change", (e) => {
    pictures = filter(pictures, e.target.value);
    photoSection.innerHTML = "";
    pictures.forEach((pic) => {
      const pictureModel = picturesFactory(pic, photographerName);
      const pictureCardDOM = pictureModel.getPicturesCardDOM();
      photoSection.appendChild(pictureCardDOM);
      pictureCardDOM.addEventListener("click", pictureModel.displayLightModal);
    });
  });

  pictures.forEach((pic) => {
    const pictureModel = picturesFactory(pic, photographerName);
    const pictureCardDOM = pictureModel.getPicturesCardDOM();
    photoSection.appendChild(pictureCardDOM);
    pictureCardDOM.addEventListener("click", pictureModel.displayLightModal);
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
  let pictures = await getPhotographerPictures(photographer.id);

  displayData({ pictures, photographer });
}

function filter(pictures, value) {
  console.log("test");
  switch (value) {
    case "pop":
      // descending
      pictures.sort((a, b) => {
        return a.likes < b.likes;
      });
      break;
    case "date":
      // increasing
      pictures.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      break;
    default:
      // increasing
      pictures.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;
  }
  console.log(pictures);
  return pictures;
}
init();
