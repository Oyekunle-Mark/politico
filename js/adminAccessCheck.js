// checks if the user is an admin

const redirect = url => {
  location.href = url;
};

const adminAccessCheck = e => {

  fetch('https://politiko.herokuapp.com/api/v1/auth', {
    method: "post",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      'token': localStorage.token
    })
  })
    .then(res => res.json())
    .then(async data => {
      if (data.status === 401 || data.status === 400) {
        redirect('https://oyekunle-mark.github.io/politico/sign_in.html');
      } else if (data.data.isadmin === false) {
        redirect('https://oyekunle-mark.github.io/politico/user_home.html')
      }
    });
}

adminAccessCheck();
