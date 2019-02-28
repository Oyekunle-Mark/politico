const voteList = [];

const selectOffice = document.querySelector('.viewResultOption');
const table = document.querySelector('table');
table.innerHTML = '<h3>Choose the office you wish to view the result.</h3>';

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

const populateVoteList = async () => {
  await fetch('https://politiko.herokuapp.com/api/v1/candidates', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      let i = 0;
      data.data.forEach(candidate => {
        voteList[i] = {};
        voteList[i].id = candidate.id;
        voteList[i].candidate = candidate.candidate;
        voteList[i].office = candidate.office;
        i++;
      });
    });

  await fetch('https://politiko.herokuapp.com/api/v1/offices', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(office => {
        voteList.forEach(vote => {
          if (vote.office === office.id) {
            vote.officeName = office.type;
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
        voteList.forEach(vote => {
          if (vote.candidate === user.id) {
            vote.candidate = `${user.firstname} ${user.lastname}`;
            vote.passport = user.passporturl;
          }
        });
      });
    });
}

populateVoteList();

const createResultList = (officeId) => {
  table.innerHTML = `<tr><th>ID</th><th>Office</th><th>Candidate</th><th>Candidate's Photo</th><th>Vote Count</th></tr>`;
  let i = 0;

  voteList.forEach(vote => {
    if (vote.office == officeId) {
      const row = document.createElement('tr');
      const id = document.createElement('td');
      const office = document.createElement('td');
      const candidate = document.createElement('td');
      const candidatePhoto = document.createElement('td');
      const voteCount = document.createElement('td');
      id.innerHTML = vote.id;
      office.innerHTML = vote.officeName;
      candidate.innerHTML = vote.candidate;
      candidatePhoto.innerHTML = `<img src=${vote.passport} alt="candidate_passport" width="50px" height="50px">`;
      voteCount.innerHTML = vote.result;
      row.appendChild(id);
      row.appendChild(office);
      row.appendChild(candidate);
      row.appendChild(candidatePhoto);
      row.appendChild(voteCount);
      table.appendChild(row);

      i++;
    }
  });

  if (i === 0) {
    table.innerHTML = '<h3>There has been no votes for a candidate running for this office.</h3>';
  }
}

const officeOptionChange = async () => {
  table.innerHTML = '<h3>Loading result...</h3>';
  const officeId = selectOffice.options[selectOffice.selectedIndex].value;
  
  await fetch(`https://politiko.herokuapp.com/api/v1/office/${officeId}/result`, {
    method: "post",
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        data.data.forEach(result => {
          voteList.forEach(vote => {
            if (vote.id === result.candidate) {
              vote.result = result.count;
            }
          });
        });
      }
    });
    
    createResultList(officeId);
}

selectOffice.addEventListener('change', officeOptionChange);
