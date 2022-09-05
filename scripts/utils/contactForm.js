async function displayModal() {
  const main = document.querySelector("main");
  const modal = document.getElementById("contact_modal");
  const title = document.querySelector(".modal header h2 span");
  const photographer = await getPhotographer();

  // add main aria hidden for accessibility
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");

  // Add photographer name
  title.innerText = photographer.name;
  modal.style.display = "block";

  // event listener for closing modal at "escape" keydown
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  // add main aria hidden for accessibility
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
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
