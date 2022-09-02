function displayModal() {
  const modal = document.getElementById("contact_modal");
  const title = document.querySelector(".modal header h2");
  const name = JSON.parse(window.sessionStorage.getItem("profil")).name;

  title.innerHTML = `Contactez moi <span class="modal-photographer-name">${name}</span>`;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function submitForm() {
  const firstName = document.querySelector("#contact-firstname").value;
  const lastName = document.querySelector("#contact-lastname").value;
  const email = document.querySelector("#contact-email").value;
  const message = document.querySelector("#contact-message").value;

  const options = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    msg: message,
  };
  console.log(options);
}
