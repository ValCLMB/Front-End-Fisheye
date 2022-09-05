async function getPhotographers() {
  let photographers;

  await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((json) => (photographers = json.photographers));

  return photographers;
}

async function getPhotographer() {
  const photographers = await getPhotographers();

  // get the ID via url
  let id = new URL(document.location).searchParams.get("user");
  id = parseInt(id);
  // return photographer object that match with id
  let photographer = photographers.find((elem) => elem.id === id);
  return photographer;
}

async function getPictures() {
  // get the ID via url
  let id = new URL(document.location).searchParams.get("user");
  id = parseInt(id);

  let pictures = [];

  // Return all the pictures with photographerId relative to id
  await fetch("../../data/photographers.json")
    .then((res) => res.json())
    .then((json) =>
      json.media.forEach((media) => {
        if (media.photographerId === id) pictures.push(media);
      })
    );
  return pictures;
}
