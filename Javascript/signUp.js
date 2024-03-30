const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confrim = document.getElementById('confirm');

/* let users = [
    {   userID: "1",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    }
] */

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkNameInput();
    checkEmailInput();
    checkPasswordInput();
    checkConfirmInput();
})

function checkNameInput() {
    const nameValue = username.value.trim();

    if(nameValue === '') {
        showErrorFor(username, 'Name darf nicht frei bleiben');
    } else {
        showSuccessFor(username);
    }
}

function checkEmailInput() {
    const emailValue = email.value.trim();

    if(emailValue === '') {
        showErrorFor(email, 'Email darf nicht frei bleiben');
    } else if(!isEmail(emailValue)){
        showErrorFor(email, 'Keine valide Emailadresse');

        showSuccessFor(email);
    }
}   

function checkPasswordInput() {
    const passwordValue = password.value.trim(); 
    
    if(passwordValue === '') {
        showErrorFor(password, 'Passwort darf nicht frei bleiben');
    } else {
        showSuccessFor(password);
    }
}   

function checkConfirmInput() {
    const confirmValue = confirm.value.trim();
    if(confirmValue === '') {
        showErrorFor(confirm, 'Passwort-Bestätigung darf nicht frei bleiben');
    } else {
        showSuccessFor(confirm);
    }
}

function showErrorFor(input, message) {
    let inputField = input.perentElement;
    let inputInfo = inputField.querySelector('input-info');

    inputInfo.innerText = message;

    inputField.className = 'input-field.error'; //error muss noch definiert wert
}

showSuccessFor(input)


function isEmail(email) {
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(String(email).toLowerCase());
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
