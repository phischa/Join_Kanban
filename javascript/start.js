let remember = false;

/**
 * This function gets executed on load to start the script.
 */
async function initLogin() {
    await loadUsers();
    await loadRememberMe();
    deleteActualUser();
    await isRemember();
}

async function onclickLogin() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    await login(email, password);
}

/**
 * This function checks if the filled in email and password match the ones in the database. If so it logs the user in, if not it show error.
 */
async function login(email, password) {
    user = users.find(u => u.email == email && u.password == password);
    if (user) {
        actualUser = user;
        await storeActualUser();
        window.location.href = 'summary.html';
    } else {
        addBorderColorRed();
        wrongPasswordText();
    }
}

/**
 * This function logs in a guest user. 
 */
async function guestLogin() {
    deleteActualUser();
    window.location.href = 'summary.html';
}

/**
 * This function gets the element by id and adds a class to color the border red.
 */
function addBorderColorRed() {
    document.getElementById('input-field').classList.add('border-red');
}

/**
 * This function gets the element by id and adds a class to show the wrong password text. 
 */
function wrongPasswordText() {
    document.getElementById('wrong-password').classList.remove('d-none');
}

function setRemeberMe() {
    if (!remember) {
        remember = true;
    } else {
        remember = false;
    }
    rememberMe();
}

async function isRemember() {
    if (remember) {
        let rememberedEmail = localStorage.getItem('rememberedEmail');
        let rememberedPassword = localStorage.getItem('rememberedPassword');
        await login(rememberedEmail, rememberedPassword);
    }
}

/**
 * This function checks iff the "remember me" checkbox is checked. If so it stores the email in the database.
 */
/* function rememberMe() {
    let check = document.getElementById('remember-me');
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    if (check.src.includes('checkbox-default.svg')) {
        check.src = '../img/icons/checkbox-checked.svg';
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
    } else {
        check.src = '../img/icons/checkbox-default.svg';
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
    }
} */

function rememberMe() {
    let check = document.getElementById('remember-me');
    if (check.src.includes('checkbox-default.svg')) {
        check.src = '../img/icons/checkbox-checked.svg';
    } else {
        check.src = '../img/icons/checkbox-default.svg';
    }
}

/**
 * This function load the remembered email forim the database.
 */
async function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    let rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
        document.getElementById("email").value = rememberedEmail;
        document.getElementById("password").value = rememberedPassword;
        await login();
    }
}

/**
 * This function changes the icon in the password iput form "lock" to "crossed eye".
 */
function changeIconToVisibilityOff() {
    document.getElementById('password-icon').src = '../img/icons/visibility_off.svg';
    document.getElementById('input-field').classList.remove('border-red');
    document.getElementById('wrong-password').classList.add('d-none');
}

/**
 * This function changes the type of the password input from "password" to "text" to make the password visible. It also changes the icon based on the input type.
 */
function changeInputType() {
    let icon = document.getElementById('password-icon');
    if (icon.src.includes('visibility_off.svg')) {
        icon.src = '../img/icons/visibility_on.svg';
        document.getElementById('password').type = 'text';
        addBorderColorBlue();
    } else {
        icon.src = '../img/icons/visibility_off.svg';
        document.getElementById('password').type = 'password';
        removeBorderColorBlue();
    }
}

/**
 * This funktion adds the blue border colour to the password input field.
 */
function addBorderColorBlue() {
    document.getElementById('input-field').classList.add('border-blue');
}

/**
 * This funktion removes the blue border colour to the password input field.
 */
function removeBorderColorBlue() {
    document.getElementById('input-field').classList.remove('border-blue');
}




