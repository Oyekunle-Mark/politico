const redirect = url => {
  location.href = url;
};

const accessCheck = e => {
  fetch('https://politiko.herokuapp.com/api/v1/auth', {
    method: "get",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      'token': localStorage.token
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 401 || data.status === 400) {
        redirect('https://oyekunle-mark.github.io/politico/sign_in.html')
      }
    })
}

accessCheck();
