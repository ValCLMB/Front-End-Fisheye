function closeLightModal() {
  const modal = document.querySelector(".light-modal");
  modal.style.display = "none";
  // add main aria hidden for accessibility
  document.querySelector("main").setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
}
