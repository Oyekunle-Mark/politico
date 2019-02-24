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
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "Party name already exist."
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      }
    });
};

document.querySelector(".createPartyForm").addEventListener('submit', createParty);

const createOffice = e => {
  e.preventDefault();

  const form = document.querySelector(".createOfficeForm");

  // get the select element text content
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
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "Office name already exist."
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      }
    });
};

document.querySelector(".createOfficeForm").addEventListener('submit', createOffice);

const getAllParty = () => {
  const table = document.querySelector('table');
  table.innerHTML = '<h1>Loading parties...</h1>';

  fetch('https://politiko.herokuapp.com/api/v1/parties/', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        // set the table header
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
      } else if (data.status === 404) {
        table.innerHTML = '<h1>No parties added.</h1>';
      }
    });
}

getAllParty();

const deleteParty = id => {
  fetch(`https://politiko.herokuapp.com/api/v1/parties/${id}`, {
    method: "delete",
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        getAllParty();
      }
    })
}

const editParty = id => {
  const editInput = document.querySelector('.editPartyForm div');
  const cancelButton = document.querySelector('.cancelButton');
  editInput.classList.remove('hidden');
  cancelButton.addEventListener('click', () => {
    editInput.classList.add('hidden');
  });

  const editButton = document.querySelector('.editButton');

  editButton.addEventListener('click', () => {
    const newName = document.querySelector('.edit').value;

    fetch(`https://politiko.herokuapp.com/api/v1/parties/${id}/name`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token
      },
      body: JSON.stringify({
        name: newName
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 202) {
          location.reload();
        } else if (data.status === 500) {
          const editInfo = document.querySelector('.editInfo');
          editInfo.textContent = 'Party name already exits';
          editInfo.classList.remove('hidden');
        } else if (data.status === 400) {
          const editInfo = document.querySelector('.editInfo');
          editInfo.textContent = 'Party name must be 3 characters or more';
          editInfo.classList.remove('hidden');
        }
      });
  })

}
