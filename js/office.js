const getAllOffice = () => {
  const table = document.querySelector('table');
  table.innerHTML = '<h1>Loading offices...</h1>';

  fetch('https://politiko.herokuapp.com/api/v1/offices', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        table.innerHTML = '<tr><th>ID</th><th>Office Name</th><th>Office Type</th>';

        data.data.forEach(office => {
          const row = document.createElement('tr');
          const officeId = document.createElement('td');
          const officeName = document.createElement('td');
          const officeType = document.createElement('td');
          officeId.innerHTML = office.id;
          officeName.innerHTML = office.name;
          officeType.innerHTML = office.type;
          row.appendChild(officeId);
          row.appendChild(officeName);
          row.appendChild(officeType);
          table.appendChild(row);
        });
      } else if (data.status === 404) {
        table.innerHTML = '<h1>No offices added.</h1>';
      }
    });
}

getAllOffice();

const getSpecificOffice = () => {
  const table = document.querySelector('table');
  const id = document.querySelector('.officeId').value;
  console.log(id);
  fetch(`https://politiko.herokuapp.com/api/v1/offices/${id}`, {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        table.innerHTML = '<tr><th>ID</th><th>Office Name</th><th>Office Type</th>';

        data.data.forEach(office => {
          const row = document.createElement('tr');
          const officeId = document.createElement('td');
          const officeName = document.createElement('td');
          const officeType = document.createElement('td');
          officeId.innerHTML = office.id;
          officeName.innerHTML = office.name;
          officeType.innerHTML = office.type;
          row.appendChild(officeId);
          row.appendChild(officeName);
          row.appendChild(officeType);
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

document.querySelector('.getOfficeButton').addEventListener('click', getSpecificOffice);
