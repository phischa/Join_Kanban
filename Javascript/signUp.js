

async function initSignUp() {
    loadUsers();
} 

function addUser() {
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUser(email, password, username);
    
    window.location.href = 'start.html?msg=Du hast dich erfolgreich regestriert.';
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
