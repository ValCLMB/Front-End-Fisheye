function picturesFactory(picture, photographerName) {
  const { date, likes, price, image, title, video } = picture;

  const name = photographerName.split(" ")[0];
  const path = `/assets/photographers/${name}/${image ? image : video}`;

  // pictures card
  function getPicturesCardDOM() {
    const article = document.createElement("article");

    const media = imageOrVideo();

    // descr
    const descr = document.createElement("div");
    descr.classList.add("descr");

    const paragraphClasses = [
      { name: "title", value: title },
      {
        name: "likes",
        value: `${likes}<img src="/assets/icons/heart.svg" alt="like" class="likes-img"/>`,
      },
    ];

    createDescription(paragraphClasses, descr);

    article.appendChild(media);
    article.appendChild(descr);
    return article;
  }

  function imageOrVideo() {
    // img - video
    let img, vid;

    // Create img or video tag according to the format
    if (image) {
      img = document.createElement("img");
      img.setAttribute("src", path);
      img.classList.add("photographer-photo");
    } else {
      vid = document.createElement("video");
      vid.classList.add("video");
      vid.classList.add("photographer-photo");

      const src = document.createElement("source");
      src.setAttribute("src", path);
      src.setAttribute("type", "video/mp4");

      vid.appendChild(src);
    }

    return image ? img : vid;
  }

  function displayLightModal() {
    const main = document.querySelector("main");
    const modal = document.querySelector(".light-modal");
    const imgContainer = document.querySelector(".light-modal-media");

    modal.style.display = "block";
    imgContainer.innerHTML = "";

    const media = imageOrVideo();

    imgContainer.appendChild(media);
  }

  return { getPicturesCardDOM, displayLightModal };
}
