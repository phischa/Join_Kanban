/**
 * This function gets executed on load to start the script.
 */
async function initSignUp() {
  await loadUsers();
  deleteActualUser();
}

/**
 * This function gets the values of the inputs.
 */
function newUser() {
  let username = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirm = document.getElementById('confirm').value;
  passwordConfirm(email, username, password, confirm);
}

/**
 * This function confirms that the 1. & 2. password are equal. If so it leads to user creation, if not it leads to functions idicating the error.
 * 
 * @param {string} email - The email of the new user.
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} confirm - The password confirmation of the new user.
 */
async function passwordConfirm(email, username, password, confirm) {
  if (password == confirm) {
    await createUser(email, password, username);
    setTimeout(forwardToLoginSide, 2500);
    successfulText();
  } else {
    wrongPasswordText();
    addBorderColorRed();
  };
}

function forwardToLoginSide() {
  window.location.href = 'start.html?msg=Du hast dich erfolgreich regestriert.';
}

function successfulText() {
  document.getElementById('popup').classList.remove('d-none');
}

/**
 * This function gets the element by id and adds a class to color the border red.
 */
function addBorderColorRed() {
  document.getElementById('input-field2').classList.add('border-red');
}

/**
 * This function gets the element by id and adds a class to show the wrong password text. 
 */
function wrongPasswordText() {
  document.getElementById('wrong-password').classList.remove('d-none');
}

/**
 * This function changes the custom icon of the checkbox based on clicking.
 */
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
