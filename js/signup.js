const alert = document.querySelector(".alert");
const alertMessage = document.querySelector(".alert div");
const dismissAlert = document.querySelector(".alert span");

dismissAlert.addEventListener("click", () => {
  alert.classList.add("hidden");
});

const redirect = url => {
  location.href = url;
};

const storeToken = token => {
  localStorage.token = token;
};

const signUp = e => {
  e.preventDefault();

  const form = document.querySelector("form");
  const formData = new FormData(form);

  fetch("https://politiko.herokuapp.com/api/v1/auth/signup", {
    method: "post",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Registration successful!";
        alert.classList.remove("hidden");
        storeToken(data.data[0].token);
        setTimeout(
          redirect,
          1000,
          "https://oyekunle-mark.github.io/politico/user_home.html"
        );
      } else if (data.status === 500) {
        alertMessage.textContent = "Email or phone number already exist";
        alert.classList.remove("hidden");
      }
    });
};

document.querySelector("form").addEventListener('submit', signUp);
