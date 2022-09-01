function picturesFactory(picture, photographerName) {
  const { date, likes, price, image } = picture;

  console.log(picture);
  const name = photographerName.split(" ")[0];

  // pictures card
  function getPicturesCardDOM() {
    const article = document.createElement("article");
    // img
    const img = document.createElement("img");
    img.setAttribute("src", `/assets/photographers/${name}/${image}`);
    const descr = document.createElement("div");

    article.appendChild(img);
    article.appendChild(descr);
    return article;
  }

  return { picture, getPicturesCardDOM };
}
