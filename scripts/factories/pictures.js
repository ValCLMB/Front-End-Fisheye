function picturesFactory(picture, photographerName) {
  const { date, likes, price, image, title, video } = picture;

  const name = photographerName.split(" ")[0];

  // pictures card
  function getPicturesCardDOM() {
    const article = document.createElement("article");
    // img - video
    const path = `/assets/photographers/${name}/${image ? image : video}`;
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

    article.appendChild(image ? img : vid);
    article.appendChild(descr);
    return article;
  }

  return { getPicturesCardDOM };
}
