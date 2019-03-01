const castVote = [];
const table = document.querySelector('table');
table.innerHTML = '<h3>Loading voting history...</h3>';

const addProfile = () => {
  const name = document.querySelector('.username');
  const phoneNumber = document.querySelector('.phoneNumber');
  const email = document.querySelector('.emailAddress');
  const profilePic = document.querySelector('.profilePicture');

  fetch('https://politiko.herokuapp.com/api/v1/auth', {
    method: "post",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.token
    })
  })
    .then(response => response.json())
    .then(data => {
      name.textContent = `${data.data.firstname} ${data.data.othername} ${data.data.lastname}`;
      phoneNumber.textContent = data.data.phonenumber;
      email.textContent = data.data.email;
      profilePic.innerHTML = `<img src=${data.data.passporturl} alt="profile_pic" width="150px" height="150px" />`;
    })
}

addProfile();

const populateCastVote = async () => {
  let userId;

  await fetch('https://politiko.herokuapp.com/api/v1/auth', {
    method: "post",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.token
    })
  })
    .then(response => response.json())
    .then(data => {
      userId = data.data.id;
    })

  await fetch(`https://politiko.herokuapp.com/api/v1/votes/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      let i = 0;
      data.data.forEach(vote => {
        castVote[i] = {};
        castVote[i].createdOn = vote.createdon;
        castVote[i].office = vote.office;
        castVote[i].candidate = vote.candidate;
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
        castVote.forEach(vote => {
          if (vote.office === office.id) {
            vote.office = office.type;
          }
        });
      });
    });

  await fetch('https://politiko.herokuapp.com/api/v1/candidates', {
    headers: {
      'x-access-token': localStorage.token
    }
  })
    .then(response => response.json())
    .then(data => {
      data.data.forEach(candidate => {
        castVote.forEach(vote => {
          if (vote.candidate === candidate.id) {
            vote.candidate = candidate.candidate;
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
        castVote.forEach(vote => {
          if (vote.candidate === user.id) {
            vote.candidate = `${user.firstname} ${user.lastname}`;
            vote.passport = user.passporturl;
          }
        });
      });
    });

  table.innerHTML = `<tr><th>Office</th><th>Candidate</th><th>Photograph</th><th>Date Voted</th></tr>`;

  castVote.forEach(vote => {
    const row = document.createElement('tr');
    const office = document.createElement('td');
    const candidate = document.createElement('td');
    const photo = document.createElement('td');
    const createdOn = document.createElement('td');
    office.innerHTML = vote.office;
    candidate.innerHTML = vote.candidate;
    photo.innerHTML = `<img src=${vote.passport} alt="c_p" width="30px" height="30px">`;
    createdOn.innerHTML = vote.createdOn.slice(0, 10);
    row.appendChild(office);
    row.appendChild(candidate);
    row.appendChild(photo);
    row.appendChild(createdOn);
    table.appendChild(row);
  });

  if (castVote.length === 0) {
    table.innerHTML = '<h3>You are yet to vote.</h3>';
  }
}

populateCastVote();
