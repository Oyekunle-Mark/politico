const redirect = url => {
  location.href = url;
};

const accessCheck = async (e) => {
  await fetch('https://politiko.herokuapp.com/api/v1/auth', {
    method: "post",
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

      document.getElementsByName('body').innerHTML = `
      <header>
      <h1><a href="user_home.html">Politico</a></h1>
  
  
      <div class="dropdown">
        <a href="user_home.html" class="dropdownPrimary">Menu &#9660;</a>
        <div class="dropdownSecondary">
          <a href="express_interest.html">Express Interst</a>
          <a href="office.html">Political Offices</a>
          <a href="view_result.html">View Result</a>
        </div>
      </div>
      <nav>
        <ul>
          <li></li>
          <li><a href="user_profile.html">Profile</a></li>
          <li><a href="index.html">Logout</a></li>
        </ul>
      </nav>
    </header>
  
    <section>
      <article>
  
        <h3 class="partyTable">Registered political parties</h3>
  
        <table>
          <tr>
            <th>ID</th>
            <th>Party Name</th>
            <th>Address</th>
            <th>Logo</th>
          </tr>
          <tr>
            <td>1</td>
            <td>PDP</td>
            <td>Francis Avenue, Yaba, Lagos.</td>
            <td><img src="img/pdp.jpg" alt="party_logo" width="50px" height="50px"></td>
          </tr>
          <tr>
            <td>2</td>
            <td>APC</td>
            <td>Asokoro, Abuja.</td>
            <td><img src="img/apc.jpeg" alt="party_logo" width="50px" height="50px"></td>
          </tr>
          <tr>
            <td>3</td>
            <td>ADP</td>
            <td>Herbert Macaulay Drive, Lagos.</td>
            <td><img src="img/adp.jpg" alt="party_logo" width="50px" height="50px"></td>
          </tr>
          <tr>
            <td>4</td>
            <td>GPN</td>
            <td>Iwo Road, Ibadan</td>
            <td><img src="img/gpn.jpeg" alt="party_logo" width="50px" height="50px"></td>
          </tr>
        </table>
  
        <div class="pagination">
          <a href="#">&laquo;</a>
          <a href="#" class="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">&raquo;</a>
        </div>
  
      </article>
    </section>
  
    <footer>
      <p>&copy; 2019 Politico</p>
      <p>All rights reserved</p>
    </footer>`
    })
}

accessCheck();
