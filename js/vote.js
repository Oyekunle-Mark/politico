const candidateList = [];

const selectOffice = document.querySelector('.voteOfficeOption');
const table = document.querySelector('table');
table.innerHTML = '<h3>Choose the office you wish to vote for</h3>';

const getFilterOption = () => {
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
        option.innerHTML = `${office.type}`;
        selectOffice.appendChild(option);
      })
    });
};

getFilterOption();

const populateCandidateList = async () => {
  await fetch('https://politiko.herokuapp.com/api/v1/candidates', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      let i = 0;
      data.data.forEach(candidate => {
        candidateList[i] = {};
        candidateList[i].id = candidate.id;
        candidateList[i].party = candidate.party;
        candidateList[i].office = candidate.office;
        candidateList[i].user = candidate.candidate;
        i++;
      });
    });

  await fetch('https://politiko.herokuapp.com/api/v1/parties/', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(party => {
        candidateList.forEach(candidate => {
          if (candidate.party === party.id) {
            candidate.party = party.name;
            candidate.logo = party.logourl
          }
        });
      });
    });

  await fetch('https://politiko.herokuapp.com/api/v1/auth/users', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(user => {
        candidateList.forEach(candidate => {
          if (candidate.user === user.id) {
            candidate.name = `${user.firstname} ${user.lastname}`;
            candidate.passport = user.passporturl;
          }
        });
      });
    });
}

populateCandidateList();

const createBallot = (officeId) => {
  table.innerHTML = `<tr><th>ID</th><th>Candidate</th><th>Candidate's Photo</th><th>Party</th><th>Party Logo</th><th></th></tr>`;
  let i = 0;
  
  candidateList.forEach(candidate => {
    if (candidate.office == officeId) {
      const row = document.createElement('tr');
      const candidateId = document.createElement('td');
      const candidateName = document.createElement('td');
      const candidatePhoto = document.createElement('td');
      const partyName = document.createElement('td');
      const partyLogo = document.createElement('td');
      const voteButton = document.createElement('td');
      candidateId.innerHTML = candidate.id;
      candidateName.innerHTML = candidate.name;
      candidatePhoto.innerHTML = `<img src=${candidate.passport} alt="candidate_passport" width="50px" height="50px">`;
      partyName.innerHTML = candidate.party;
      partyLogo.innerHTML = `<img src=${candidate.logo} alt="party_logo" width="50px" height="50px">`;
      voteButton.innerHTML = `<button class="voteButton" onclick=voteCandidate(${candidate.office},${candidate.id})>Vote</button>`;
      row.appendChild(candidateId);
      row.appendChild(candidateName);
      row.appendChild(candidatePhoto);
      row.appendChild(partyName);
      row.appendChild(partyLogo);
      row.appendChild(voteButton);
      table.appendChild(row);
      i++;
    }
  })

  if (i === 0) {
    table.innerHTML = '<h3>No candidate is registered for this office.';
  }
}

const voteCandidate = (idOffice, idCandidate) => {
  const alertMessage = document.querySelector("section.adminAlert div");

  fetch('https://politiko.herokuapp.com/api/v1/votes/', {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    },
    body: JSON.stringify({
      office: idOffice,
      candidate: idCandidate
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 201) {
        alertMessage.textContent = "Vote cast!";
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      } else {
        alertMessage.textContent = "Your have voted for this office in this election already."
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 2000);
      }
    })
}

const officeOption = () => {
  const officeId = selectOffice.options[selectOffice.selectedIndex].value;
  createBallot(officeId);
}

selectOffice.addEventListener('change', officeOption);
