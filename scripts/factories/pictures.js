function picturesFactory(picture, photographerName, pictures, index) {
  const { image, title, video } = picture;
  let { likes } = picture;

  const name = photographerName.split(" ")[0];
  const path = `/assets/photographers/${name}/${image ? image : video}`;

  picture.media = imageOrVideo();

  // pictures card
  function getPicturesCardDOM() {
    const article = document.createElement("article");

    const media = imageOrVideo();
    const button = document.createElement("button");
    button.append(media);
    button.setAttribute("role", "button");
    button.setAttribute("aria-label", "Open a close up view");
    // Light modal view
    button.addEventListener("click", displayLightModal);

    // descr
    const descr = document.createElement("div");
    descr.classList.add("descr");

    const paragraphClasses = [
      { name: "title", value: title },
      {
        name: "likes",
        value: `<span id="likes-count-${
          title.split(" ")[0]
        }">${likes}</span><button><img src="/assets/icons/heart.svg" alt="like" class="likes-img"/></button/>`,
        event: increaseLikes,
      },
    ];

    async function increaseLikes() {
      picture.likes += 1;
      document.querySelector(`#likes-count-${title.split(" ")[0]}`).innerText =
        picture.likes;
      totalLikes = 0;
      pictures.forEach((pic) => (totalLikes += pic.likes));
      document.querySelector(".total-likes").innerText = totalLikes;
    }

    createDescription(paragraphClasses, descr);

    article.appendChild(button);
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
      img.setAttribute("alt", title);
      img.classList.add("photographer-photo");
    } else {
      vid = document.createElement("video");
      vid.classList.add("video");
      vid.classList.add("photographer-photo");
      vid.setAttribute("role", "button");

      const src = document.createElement("source");
      src.setAttribute("src", path);
      src.setAttribute("type", "video/mp4");

      vid.appendChild(src);
    }
    return image ? img : vid;
  }

  function displayLightModal() {
    const modal = document.querySelector(".light-modal");
    const imgContainer = document.querySelector(".light-modal-media");

    // add aria for accessiblility
    document.querySelector("main").setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", true);
    modal.setAttribute("tabindex", -1);

    // event listener for close with "escape"
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightModal();
    });
    //  display modal and add img
    imgContainer.innerHTML = "";
    modal.style.display = "block";

    if (picture.media.tagName === "VIDEO") {
      picture.media.play();
    }
    imgContainer.appendChild(picture.media);

    changePictures();
  }

  function changePictures() {
    const imgContainer = document.querySelector(".light-modal-media");
    const arrows = document.querySelectorAll(".light-modal-arrows");

    let indexImg = index;

    function changePicture(increase) {
      if (increase) {
        if (indexImg < pictures.length - 1) indexImg += 1;
      } else {
        if (indexImg > 0) indexImg -= 1;
      }

      if (pictures[indexImg].media.tagName === "VIDEO") {
        pictures[indexImg].media.play();
      }

      imgContainer.innerHTML = "";
      imgContainer.appendChild(pictures[indexImg].media);
    }

    //  changing index according to arrow left or right
    arrows[1].addEventListener("click", () => changePicture(true));
    arrows[0].addEventListener("click", () => changePicture(false));
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") changePicture(false);
      else if (e.key === "ArrowRight") changePicture(true);
    });
    arrows[0].focus();
  }

  return { getPicturesCardDOM, displayLightModal };
}
