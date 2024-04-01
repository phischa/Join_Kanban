/* let user = {
    userID: {String},
    email: {String},
    password: {String},
    name: {String}

} */

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const guestBtn = document.getElementById('guest-btn');

function login() {
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        log('User gefunden')
    } else {
        log('Kein User gefunden')
    }
}
