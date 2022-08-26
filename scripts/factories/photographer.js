function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = portrait ? `assets/photographers/portrait/${portrait}` : "assets/photographers/account.png";

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        // name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // container
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}