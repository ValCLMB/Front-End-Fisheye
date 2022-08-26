function photographerFactory(data) {
    const { name, portrait,city,country,tagline,price } = data;

    const picture = portrait ? `assets/photographers/portrait/${portrait}` : "assets/photographers/account.png";

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // upSection
        const upSection = document.createElement("section")
        const link = document.createElement("a");
        link.setAttribute("href","photographer.html")
        // picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        // name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        upSection.appendChild(link)
        link.appendChild(img);
        link.appendChild(h2)
        // downSection
        const downSection = document.createElement('section');
        downSection.setAttribute("class","photographer_infos")
        const paragraphClasses = [
            {name:"location", value:`${city}, ${country}`},
            {name:"tagline", value:`${tagline}`},
            {name:"price", value:`${price}€/jour`}
        ]
        paragraphClasses.forEach(p => {
            let infosLine = document.createElement("p");
            infosLine.setAttribute("class",p.name);
            infosLine.textContent = p.value;
            downSection.appendChild(infosLine)
        })
        // container
        article.appendChild(upSection)
        article.appendChild(downSection)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}