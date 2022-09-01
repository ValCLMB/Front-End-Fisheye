function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = portrait
    ? `assets/photographers/portrait/${portrait}`
    : "assets/photographers/account.png";

  function getUserCardDOM() {
    const article = document.createElement("article");
    // upSection
    const upSection = document.createElement("section");
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html`);
    // Pass data in sessions storage when user wants to see detail
    link.addEventListener("click", () =>
      window.sessionStorage.setItem("profil", JSON.stringify(data))
    );
    // picture
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("class", "profil_pic");
    // name
    const h2 = document.createElement("h2");
    h2.textContent = name;
    upSection.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    // downSection
    const downSection = document.createElement("section");
    downSection.setAttribute("class", "photographer_infos");
    const paragraphClasses = [
      { name: "location", value: `${city}, ${country}` },
      { name: "tagline", value: `${tagline}` },
      { name: "price", value: `${price}€/jour` },
    ];
    paragraphClasses.forEach((p) => {
      let infosLine = document.createElement("p");
      infosLine.setAttribute("class", p.name);
      infosLine.textContent = p.value;
      downSection.appendChild(infosLine);
    });
    // container
    article.appendChild(upSection);
    article.appendChild(downSection);
    return article;
  }

  // Detail header
  function getHeaderDOM() {
    const infos = document.createElement("section");
    const h1 = document.createElement("h1");
    const subInfos = document.createElement("div");

    // infos - left
    h1.textContent = name;

    const paragraphClasses = [
      { name: "location", value: `${city}, ${country}` },
      { name: "tagline", value: `${tagline}` },
    ];
    paragraphClasses.forEach((p) => {
      let infosLine = document.createElement("p");
      infosLine.setAttribute("class", p.name);
      infosLine.textContent = p.value;
      subInfos.appendChild(infosLine);
    });

    infos.appendChild(h1);
    infos.appendChild(subInfos);
    // picture - right
    const picture = portrait
      ? `assets/photographers/portrait/${portrait}`
      : "assets/photographers/account.png";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("class", "profil_pic");
    return { infos, img };
  }

  // like/price infos
  function getAdditionalInfosDOM() {
    const container = document.createElement("aside");
    container.classList.add("additional_infos");

    const paragraphClasses = [
      { name: "likes", value: `test` },
      { name: "price", value: `${price}€/jour` },
    ];

    paragraphClasses.forEach((p) => {
      let infosLine = document.createElement("p");
      infosLine.setAttribute("class", p.name);
      infosLine.textContent = p.value;
      container.appendChild(infosLine);
    });

    return container;
  }

  return { name, picture, getUserCardDOM, getHeaderDOM, getAdditionalInfosDOM };
}

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
