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

function switchCheckbox() {
  let check = document.getElementById('checkbox');
  if (check.src.includes('checkbox-default.svg')) {
      check.src = '../img/icons/checkbox-checked.svg';
  } else {
      check.src = '../img/icons/checkbox-default.svg';
  }
}

function changeInputType() {
  let icon = document.getElementById('password-icon');
  if (icon.src.includes('visibility_off.svg')) {
      icon.src = '../img/icons/visibility_on.svg';
      document.getElementById('password').type = 'text';
      document.getElementById('confirm').type = 'text';
      addBorderColorBlue();
  } else {
      icon.src = '../img/icons/visibility_off.svg';
      document.getElementById('password').type = 'password';
      document.getElementById('confirm').type = 'password';
      removeBorderColorBlue();
  }
}

function addBorderColorBlue() {
  document.getElementById('input-field').classList.add('border-blue');
}

function removeBorderColorBlue() {
  document.getElementById('input-field').classList.remove('border-blue');
}

function changeIconToVisibilityOff() {
  document.getElementById('password-icon').src = '../img/icons/visibility_off.svg';
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
