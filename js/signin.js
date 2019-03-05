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

const signIn = e => {
  e.preventDefault();

  fetch("https://politiko.herokuapp.com/api/v1/auth/login", {
    method: "post",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      "email": document.getElementById("email").value,
      "password": document.getElementById("password").value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        storeToken(data.data[0].token);
        redirect("https://oyekunle-mark.github.io/politico/user_home.html");
      } else {
        alertMessage.textContent = "Username or password incorrect";
        alert.classList.remove("hidden");
      }
    });
};

document.querySelector("form").addEventListener("submit", signIn);
