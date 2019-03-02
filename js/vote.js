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
      if (data.status === 200) {
        let i = 0;
        data.data.forEach(candidate => {
          candidateList[i] = {};
          candidateList[i].id = candidate.id;
          candidateList[i].party = candidate.party;
          candidateList[i].office = candidate.office;
          candidateList[i].user = candidate.candidate;
          i++;
        });
      }
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
  table.innerHTML = `<tr><th>Candidate</th><th>Candidate's Photo</th><th>Party</th><th>Party Logo</th><th></th></tr>`;

  candidateList.forEach(candidate => {
    let i = 0;
    if (candidate.office == officeId) {
      const row = document.createElement('tr');
      const candidateName = document.createElement('td');
      const candidatePhoto = document.createElement('td');
      const partyName = document.createElement('td');
      const partyLogo = document.createElement('td');
      const voteButton = document.createElement('td');
      candidateName.innerHTML = candidate.name;
      candidatePhoto.innerHTML = `<img src=${candidate.passport} alt="c_p" width="30px" height="30px">`;
      partyName.innerHTML = candidate.party;
      partyLogo.innerHTML = `<img src=${candidate.logo} alt="party_logo" width="30px" height="30px">`;
      voteButton.innerHTML = `<button class="voteButton" style="width:3rem;" onclick=voteCandidate(${candidate.office},${candidate.id})>Vote</button>`;
      row.appendChild(candidateName);
      row.appendChild(candidatePhoto);
      row.appendChild(partyName);
      row.appendChild(partyLogo);
      row.appendChild(voteButton);
      table.appendChild(row);

      i++;
    }

    if (i === 0) {
      table.innerHTML = '<h3>No candidates for the selected office.</h3>';
    }
  });
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
