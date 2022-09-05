function createDescription(childrens, parent) {
  // Create a paragraph for each childrens and add to parent node
  childrens.forEach((child) => {
    let p = document.createElement("p");
    p.setAttribute("class", child.name);
    p.innerHTML = child.value;
    // event on click if event
    if (child.event) p.addEventListener("click", child.event);
    parent.appendChild(p);
  });
}
