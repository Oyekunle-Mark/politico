const selectOffice = document.querySelector('.officeOptions');
const selectParty = document.querySelector('.partyOptions');
const selectUser = document.querySelector('.userOptions');

const updateForm = () => {
  fetch('https://politiko.herokuapp.com/api/v1/offices', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(office => {
        const option = document.createElement('option');
        option.setAttribute('value', `${office.id}`);
        option.innerHTML = `${office.name}, ${office.type}`
        selectOffice.appendChild(option);
      })
    });

  fetch('https://politiko.herokuapp.com/api/v1/parties/', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(party => {
        const option = document.createElement('option');
        option.setAttribute('value', `${party.id}`);
        option.innerHTML = `${party.name}`;
        selectParty.appendChild(option);
      })
    })

  fetch('https://politiko.herokuapp.com/api/v1/auth/users', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(user => {
        const option = document.createElement('option');
        option.setAttribute('value', `${user.id}`);
        option.innerHTML = `${user.firstname} ${user.lastname}, ${user.othername}`;
        selectUser.appendChild(option);
      })
    })
}

updateForm();

const createCandidate = (e) => {
  e.preventDefault();


  const alertMessage = document.querySelector("section.adminAlert div");

  const office = selectOffice.options[selectOffice.selectedIndex].value;
  const party = selectParty.options[selectParty.selectedIndex].value;
  const user = selectUser.options[selectUser.selectedIndex].value;

  fetch(`https://politiko.herokuapp.com/api/v1/office/${user}/register`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    },
    body: JSON.stringify({
      office: office,
      party: party,
      candidate: user
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Candidate registered.";
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      } else if (data.status === 500) {
        alertMessage.textContent = "User already registered for the party."
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      }
    })
}

document.querySelector('form').addEventListener('submit', createCandidate);
