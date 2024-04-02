async function initSignUp() {
    loadUsers();
} 

function addUser() {
    let username = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm = document.getElementById('confirm').value;
    passwordConfirm(password, confirm);
    createUser(email, password, username);
    
    window.location.href = 'start.html?msg=Du hast dich erfolgreich regestriert.';
}

function passwordConfirm(password, confirm) {
    if(password == confirm) {
      return;
    } else {
      alert('Passwörter sind nicht gleich')
    };
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
