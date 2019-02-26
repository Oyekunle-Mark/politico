const candidateList = [];

const selectOffice = document.querySelector('.voteOfficeOption');

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

const populateCandidateList = () => {
  fetch('https://politiko.herokuapp.com/api/v1/candidates', {
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
        candidateList[i].candidate = candidate.candidate;
        i++;
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
        candidateList.forEach(candidate => {
          if (candidate.party === party.id) {
            candidate.party = party.name;
            candidate.logo = party.logourl
          }
        });
      });
    });

  fetch('https://politiko.herokuapp.com/api/v1/auth/users', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(user => {
        candidateList.forEach(candidate => {
          if (candidate.candidate === user.id) {
            candidate.name = `${user.firstname} ${user.lastname}`;
            candidate.passport = user.passporturl;
          }
        });
      });
    });

    console.log(candidateList);
}

populateCandidateList();
