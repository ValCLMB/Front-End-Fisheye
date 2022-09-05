// Mettre le code JavaScript lié à la page photographer.html
async function getDatas() {
  const photographer = await getPhotographer();
  const pictures = await getPictures();

  return { pictures, photographer };
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

  // on change for filtering
  document.querySelector("#photos-filter").addEventListener("change", (e) => {
    pictures = filter(pictures, e.target.value);
    photoSection.innerHTML = "";
    for (let i = 0; i < pictures.length; i++) {
      const pictureModel = picturesFactory(
        pictures[i],
        photographerName,
        pictures,
        i
      );
      const pictureCardDOM = pictureModel.getPicturesCardDOM();
      photoSection.appendChild(pictureCardDOM);
    }
  });

  for (let i = 0; i < pictures.length; i++) {
    const pictureModel = picturesFactory(
      pictures[i],
      photographerName,
      pictures,
      i
    );
    const pictureCardDOM = pictureModel.getPicturesCardDOM();
    photoSection.appendChild(pictureCardDOM);
  }
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

function filter(pictures, value) {
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
  return pictures;
}
async function init() {
  const datas = await getDatas();

  displayData(datas);
}
init();
