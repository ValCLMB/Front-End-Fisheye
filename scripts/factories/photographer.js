function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = portrait
    ? `assets/photographers/portrait/${portrait}`
    : "assets/photographers/account.png";

  function getUserCardDOM() {
    const article = document.createElement("article");

    // upSection
    const upSection = document.createElement("section");
    const link = document.createElement("a");
    // add the id of the user in the url param
    link.setAttribute("href", `photographer.html?user=${id}`);

    // picture
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
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
    createDescription(paragraphClasses, downSection);

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

    const h2 = document.createElement("h2");
    h2.textContent = `${city}, ${country}`;
    h2.classList.add("location");

    const paragraphClasses = [{ name: "tagline", value: `${tagline}` }];

    createDescription(paragraphClasses, subInfos);

    infos.appendChild(h1);
    infos.appendChild(h2);
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
  function getAdditionalInfosDOM(likes) {
    const container = document.createElement("aside");
    container.classList.add("additional_infos");

    const paragraphClasses = [
      {
        name: "likes",
        value: `<span class="total-likes">${likes}</span><img src="/assets/icons/heart.svg" alt="likes" class="likes-img"/>`,
      },
      { name: "price", value: `${price}€/jour` },
    ];

    createDescription(paragraphClasses, container);

    return container;
  }

  return { name, picture, getUserCardDOM, getHeaderDOM, getAdditionalInfosDOM };
}
