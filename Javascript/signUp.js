async function initSignUp() {
    loadUsers();
} 

function addUser() {
    let username = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm = document.getElementById('confirm').value;
    passwordConfirm(email, username, password, confirm);
}

function passwordConfirm(email, username, password, confirm) {
    if(password === confirm) {
      createUser(email, password, username);
      window.location.href = 'start.html?msg=Du hast dich erfolgreich regestriert.';
    } else {
      wrongPasswordText();
      addBorderColorRed();
    };
}

function addBorderColorRed() {
  document.getElementById('input-field2').classList.add('border-red'); 
}

function wrongPasswordText() {
  document.getElementById('wrong-password').classList.remove('d-none');
}

function switchCheckbox() {
  let check = document.getElementById('checkbox');
  if (check.src.includes('checkbox-default.svg')) {
      check.src = '../img/icons/checkbox-checked.svg';
  } else {
      check.src = '../img/icons/checkbox-default.svg';
  }
}

function changeInputType1() {
  let icon = document.getElementById('password-icon1');
  if (icon.src.includes('visibility_off.svg')) {
      icon.src = '../img/icons/visibility_on.svg';
      let password = document.getElementById('password').type = 'text';
      addBorderColorBlue(password);
  } else {
      icon.src = '../img/icons/visibility_off.svg';
      document.getElementById('password').type = 'password';
      removeBorderColorBlue(password);
  }
}

function changeInputType2() {
  let icon = document.getElementById('password-icon2');
  if (icon.src.includes('visibility_off.svg')) {
      icon.src = '../img/icons/visibility_on.svg';
      let confirm = document.getElementById('confirm').type = 'text';
      addBorderColorBlue(confirm);
  } else {
      icon.src = '../img/icons/visibility_off.svg';
      document.getElementById('confirm').type = 'password';
      removeBorderColorBlue(confirm);
  }
}

function addBorderColorBlue(password, confirm) {
  password = document.getElementById('input-field1').classList.add('border-blue');
  confirm = document.getElementById('input-field2').classList.add('border-blue');
}

function removeBorderColorBlue(password, confirm) {
  password = document.getElementById('input-field1').classList.remove('border-blue');
  confirm = document.getElementById('input-field2').classList.remove('border-blue');
}

function changeIconToVisibilityOff1() {
  document.getElementById('password-icon1').src = '../img/icons/visibility_off.svg';
}

function changeIconToVisibilityOff2() {
  document.getElementById('password-icon2').src = '../img/icons/visibility_off.svg';
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
