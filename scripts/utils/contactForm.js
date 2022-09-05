function displayModal() {
  const main = document.querySelector("main");
  const modal = document.getElementById("contact_modal");
  const title = document.querySelector(".modal header h2");
  // add main aria hidden for accessibility
  main.setAttribute("aria-hidden", true);

  console.log(getPhotographer());
  // getPhotographers().title.innerHTML = `Contactez moi <span class="modal-photographer-name">${name}</span>`);
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function submitForm() {
  const form = [
    {
      name: "firstname",
      input: document.querySelector("#contact-firstname"),
    },
    {
      name: "lastname",
      input: document.querySelector("#contact-lastname"),
    },
    { name: "email", input: document.querySelector("#contact-email") },
    {
      name: "message",
      input: document.querySelector("#contact-message"),
    },
  ];

  console.log({
    firstName: form[0].input.value,
    lastName: form[0].input.value,
    email: form[0].input.value,
    message: form[0].input.value,
  });

  form.forEach((item) => (item.input.value = ""));
  closeModal();
}
