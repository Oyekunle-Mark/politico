const url = "https://politiko.herokuapp.com/api/v1/auth/signup";

const form = document.querySelector("form");
const alert = document.querySelector(".alert");
const alertMessage = document.querySelector(".alert div")
const dismissAlert = document.querySelector(".alert span");

dismissAlert.addEventListener("click", () => {
  alert.classList.add("hidden");
});

const redirect = () => {
  location.href = "https://oyekunle-mark.github.io/politico/user_home.html";
};

const storeToken = (token) => {
  localStorage.token = token;
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(url, {
    method: "post",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Registration successful!";
        alert.classList.remove("hidden");
        storeToken(data.data[0].token);
        setTimeout(redirect, 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "Email or phone number already exist";
        alert.classList.remove("hidden");
      }
    
    });
});
