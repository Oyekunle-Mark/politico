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
        table.innerHTML = '<tr><th>ID</th><th>Party Name</th><th>Logo</th>';

        data.data.forEach(party => {
          const row = document.createElement('tr');
          const partyId = document.createElement('td');
          const partyName = document.createElement('td');
          const partyLogo = document.createElement('td');
          partyId.innerHTML = party.id;
          partyName.innerHTML = party.name;
          partyLogo.innerHTML = `<img src=${party.logourl} alt="party_logo" width="50px" height="50px">`;
          row.appendChild(partyId);
          row.appendChild(partyName);
          row.appendChild(partyLogo);
          table.appendChild(row);
        });
      } else if (data.status === 404) {
        table.innerHTML = '<h1>No parties added.</h1>';
      }
    });
}

getAllParty();

const getSpecificParty = () => {
  const table = document.querySelector('table');
  const id = document.querySelector('.partyId').value;
  console.log(id);
  fetch(`https://politiko.herokuapp.com/api/v1/parties/${id}`, {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
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
        })
      } else if (data.status === 404) {
        const editInfo = document.querySelector('.editInfo');
        editInfo.textContent = 'No party matches the ID';
        editInfo.classList.remove('hidden');
        setTimeout(() => {
          editInfo.classList.add("hidden");
        }, 2000);
      } else {
        const editInfo = document.querySelector('.editInfo');
        editInfo.textContent = 'Please check your entry';
        editInfo.classList.remove('hidden');
        setTimeout(() => {
          editInfo.classList.add("hidden");
        }, 2000);
      }
    })
}

document.querySelector('.getPartyButton').addEventListener('click', getSpecificParty);
