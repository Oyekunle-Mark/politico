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
}
