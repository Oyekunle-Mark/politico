const logoutLink = document.querySelector('.logout');

const logout = e => {
  e.preventDefault();

  localStorage.removeItem('token');
  location.href = 'https://oyekunle-mark.github.io/politico/sign_in.html';
}

logoutLink.addEventListener('click',logout);
