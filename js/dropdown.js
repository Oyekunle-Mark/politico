const dropdownLink = document.querySelector('.dropdownPrimary');
const dropdownList = document.querySelector('.dropdownSecondary');
let dropped;

const dropdown = e => {
  e.preventDefault();

  if (dropped) {
    dropdownList.classList.add('hidden');
    dropped = false;
  } else {
    dropdownList.classList.remove('hidden');
    dropped = true;
  }
}

dropdownLink.addEventListener('click', dropdown);
