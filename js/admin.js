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

const getAllParty = () => {
  const table = document.querySelector('table');

  fetch('https://politiko.herokuapp.com/api/v1/parties/', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      table.innerHTML = '<tr><th>ID</th><th>Party Name</th><th>Logo</th><th></th><th></th></tr>';


      data.data.forEach(party => {
        const row = document.createElement('tr');
        const partyId = document.createElement('td');
        const partyName = document.createElement('td');
        const partyLogo = document.createElement('td');
        const editButton = document.createElement('td');
        const deleteButton = document.createElement('td');
        partyId.innerHTML = party.id;
        partyName.innerHTML = party.name;
        partyLogo.innerHTML = `<img src=${party.logourl} alt="party_logo" width="50px" height="50px">`;
        editButton.innerHTML = `<button onclick=editParty(${party.id})>Edit</button>`;
        deleteButton.innerHTML = `<button onclick=deleteParty(${party.id})>Delete</button>`
        row.appendChild(partyId);
        row.appendChild(partyName);
        row.appendChild(partyLogo);
        row.appendChild(editButton);
        row.appendChild(deleteButton);
        table.appendChild(row);
      });
    });
}

getAllParty();
