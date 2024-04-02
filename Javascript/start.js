/* let user = {
    userID: {String},
    email: {String},
    password: {String},
    name: {String}

} */

async function initLogin() {
    loadUsers();
    loadRememberMe();
}

const form = document.getElementById('form');
const loginBtn = document.getElementById('login-btn');
const guestBtn = document.getElementById('guest-btn');

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.email == email && u.password == password);
    rememberMe(email, password);
    if(user) {
        console.log('User gefunden')
        window.location.href = 'summary.html';
    } else {
        console.log('Kein User gefunden')
    }

}

function rememberMe(email, password) {
    let rememberMe = document.getElementById('remember-me').checked;
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  }

  function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      document.getElementById("email").value = rememberedEmail;
    }
  }
