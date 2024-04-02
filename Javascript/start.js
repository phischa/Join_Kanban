/* let user = {
    userID: {String},
    email: {String},
    password: {String},
    name: {String}

} */

async function initLogin() {
    loadUsers();
}

const form = document.getElementById('form');
const loginBtn = document.getElementById('login-btn');
const guestBtn = document.getElementById('guest-btn');

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        console.log('User gefunden')
        window.location.href = 'summary.html';
    } else {
        console.log('Kein User gefunden')
    }

}
