window.addEventListener("load", () => {
  const mainContainer = document.querySelector(".container");

  if (mainContainer) {
    mainContainer.classList.add("visible");
  }
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("visible");
    }, index * 1300);
  });
});
const links = document.querySelectorAll(".link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.textContent.includes("About me")) {
      document
        .querySelector(".about-me")
        .scrollIntoView({ behavior: "smooth" });
    }
    if (link.textContent.includes("Skills / What I Do")) {
      document.querySelector("aside").scrollIntoView({ behavior: "smooth" });
    }
    if (link.textContent.includes("My social media")) {
      document.querySelector(".footer").scrollIntoView({ behavior: "smooth" });
    }
  });
});
const menuButton = document.querySelector(".burger");
let menu = document.querySelector(".menu");
document.querySelector(".burger");
menuButton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
const themeButton = document.querySelector(".theme-toggle");
themeButton.addEventListener("click", switchTheme);
function switchTheme() {
  const page = document.documentElement;
  page.classList.toggle("dark");
}
const form = document.querySelector(".form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
let successMessage = document.querySelector(".form-sent");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameValue = nameInput.value.trim();
  let emailValue = email.value.trim();
  let textArea = message.value.trim();
  let correctName = /^[a-zA-Zа-яА-Я\s]+$/;

  if (
    nameValue === "" ||
    !correctName.test(nameValue) ||
    nameValue.length < 2 ||
    nameValue.length > 20
  ) {
    showError(nameInput, "Name must contain only letters (2–20)");
    return;
  }
  if (!emailValue.includes("@")) {
    showError(email, "Please enter a valid email");
    return;
  }
  if (textArea.length > 300 || textArea.length < 10) {
    showError(
      message,
      "The length of the message should be between 10 and 300 symbols"
    );
    return;
  }
  const sentData = {
    name: nameValue,
    email: emailValue,
    text: textArea,
  };
  try {
    const response = await fetch("https://formspree.io/f/xqezlpve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(sentData),
    });
  } catch {
    showError(message, "Check your connection.");
  }
  clearError(nameInput);
  clearError(email);
  clearError(message);
  form.reset();
  successMessage.style.display = "block";
});

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  input.classList.add("input-error");
  error.innerHTML = `${message}`;
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error");
  error.innerHTML = "";
  input.classList.remove("input-error");
}

const theDate = new Date();
const yearSpan = document.getElementById("year");
yearSpan.textContent = theDate.getFullYear();
