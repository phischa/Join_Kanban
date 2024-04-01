const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

function initSignUp() {
    loadUsers();
} 

function addUser() {
    users.push({email: email.value, password: password.value, name: username.value})
    window.location.href = 'login.html?msg=Du hast dich erfolgreich regestriert.'
}




// Pseudo Funktion, die verhindert, dass der Signup button klickbar ist, bevor alles ausgefüllt ist
/* https://stackoverflow.com/questions/71805724/disabling-button-until-condition-is-met-javascript
function btnDisabled() {
    let btn = document.querySelector('signup-btn')

let cash = 0;

if (cash == 1) {
  btn.disabled = false;
} else {
  btn.disabled = true;
}
}


let myBtn = document.getElementById("myBtn");

if (some condition) {
    myBtn.disabled = true;
} else {
  myBtn.disabled = false;
}
 */
