function createDescription(childrens, parent) {
  childrens.forEach((child) => {
    let p = document.createElement("p");
    p.setAttribute("class", child.name);
    p.innerHTML = child.value;
    parent.appendChild(p);
  });
}
