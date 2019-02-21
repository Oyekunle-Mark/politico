const alert = document.querySelector("section.adminAlert");
const alertMessage = document.querySelector("section.adminAlert div");

const createParty = e => {
  e.preventDefault();

  const form = document.querySelector(".createPartyForm");
  const formData = new FormData(form);

  fetch("https://politiko.herokuapp.com/api/v1/parties", {
    method: "post",
    headers: {
      'x-access-token': localStorage.token
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Party created.";
        alert.classList.remove("hidden");
        setTimeout(() => {
          alert.classList.add("hidden");
        }, 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "Party name already exist."
        alert.classList.remove("hidden");
        setTimeout(() => {
          alert.classList.add("hidden");
        }, 2000);
      }
    });
};

document.querySelector(".createPartyForm").addEventListener('submit', createParty);

const createOffice = e => {
  e.preventDefault();

  const form = document.querySelector(".createOfficeForm");

  const fn = document.getElementById("officeName");
  const officeName = fn.options[fn.selectedIndex].text;
  const t = document.getElementById("officeType");
  const officeType = t.options[t.selectedIndex].text;

  fetch("https://politiko.herokuapp.com/api/v1/offices", {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    },
    body: JSON.stringify({
      type: officeName,
      name: officeType
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 201) {
      alertMessage.textContent = "Office created.";
      alert.classList.remove("hidden");
      setTimeout(() => {
        alert.classList.add("hidden");
      }, 2000);
    } else if (data.status === 500) {
      alertMessage.textContent = "Office name already exist."
      alert.classList.remove("hidden");
      setTimeout(() => {
        alert.classList.add("hidden");
      }, 2000);
    }
  });
};

document.querySelector(".createOfficeForm").addEventListener('submit', createOffice);
