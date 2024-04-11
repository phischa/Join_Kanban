/**
 * This function gets executed on load to start the script.
 */
async function initLogin() {
    await loadUsers();
    loadRememberMe();
    deleteActualUser();
}

/**
 * This function checks if the filled in email and password match the ones in the database. If so it logs the user in, if not it show error.
 */
async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    user = users.find(u => u.email == email && u.password == password);
    if (user) {
        actualUser = user;
        await storeActualUser();
        getInitials(actualUser);
        /* window.location.href = 'summary.html'; */
    } else {
        addBorderColorRed();
        wrongPasswordText();
    }
}

function getInitials(actualUser) {
    let words = actualUser['name'];
    words = words.split(' ');
    console.log(words);
    
    let initials = '';
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        initials += word.charAt(0).toUpperCase();
    }
    addInitialsToHeader(initials);
}

/**
 * This function logs in a guest user. 
 */
function guestLogin() {
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

/**
 * This function checks iff the "remember me" checkbox is checked. If so it stores the email in the database.
 */
function rememberMe() {
    let check = document.getElementById('remember-me');
    email = document.getElementById('email').value;
    if (check.src.includes('checkbox-default.svg')) {
        check.src = '../img/icons/checkbox-checked.svg';
        localStorage.setItem('rememberedEmail', email);
    } else {
        check.src = '../img/icons/checkbox-default.svg';
        localStorage.removeItem('rememberedEmail');
    }
}

/**
 * This function load the remembered email forim the database.
 */
function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById("email").value = rememberedEmail;
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




