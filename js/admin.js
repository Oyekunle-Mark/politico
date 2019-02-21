const alert = document.querySelector(".adminAlert");
const alertMessage = document.querySelector(".adminAlert div");

const createParty = e => {
  e.preventDefault();

  const form = document.querySelector(".createPartyForm");
  const formData = new FormData(form);

  fetch("https://politiko.herokuapp.com/api/v1/parties", {
    method: "post",
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.token
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Party created.";
        alert.classList.remove("hidden");
        setTimeout(alert.classList.add("hidden"), 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "Party name already exist."
        alert.classList.remove("hidden");
        setTimeout(alert.classList.add("hidden"), 2000);
      }
    });
};

document.querySelector(".createPartyForm").addEventListener('submit', createParty);
