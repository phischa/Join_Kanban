const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confrim = document.getElementById('confirm');

let users = [
    {   userID: "1",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    },
    {   userID: "2",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    },
    {   userID: "3",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    }
]

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    const formValue = form.value.trim(); 
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim(); 
    const confirmValue = confirm.value.trim();

    if(nameValue === '') {
        // show error
        // add error class
        showErrorFor(name, 'Name darf nicht frei bleiben');
    } else {
        showSuccessFor(name);
    }
}

function showErrorFor(input, message) {
    let formControl = input.perentElement;
    let  inputInfo = formControl.querySelector('input-info');

    inputInfo.innerText = message;

    formControl.className = 'input, error'; //error muss noch definiert wert
}

showSuccessFor(input)


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
