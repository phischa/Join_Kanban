async function initLogin() {
    loadUsers();
    loadRememberMe();
}

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    user = users.find(u => u.email == email && u.password == password);
    if (user) {
        actualUser = user;
        storeActualUser();
        window.location.href = 'summary.html';
    } else {
        console.log('Kein User gefunden')
        let borderRed = document.getElementById('input-field');
        borderRed.classList.toggle('border-red'); 
    }
}

function rememberMe() {
    let check = document.getElementById('remember-me');
    email = document.getElementById('email').value;
    
    if (check.src.includes('checkbox-default.svg')) {
        check.src = '../img/icons/checkbox-checked.svg';
        localStorage.seopenAddContacttItem('rememberedEmail', email);
    } else {
        check.src = '../img/icons/checkbox-default.svg';
        localStorage.removeItem('rememberedEmail');
    }
}

function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById("email").value = rememberedEmail;
    }
}

function changeIconToLock() {
    document.getElementById('password-icon').src = '../img/icons/lock.svg';
}

function changeInputBorder() {
    let wrongPassword = document.getElementById('wrong-password');
    wrongPassword.innerHTML += `Wrong password Ups! Try again.`;
    let borderRed = document.getElementById('input-field');
    borderRed.classList.add('border-red'); 
}

function changeIconToVisibilityOff() {
    document.getElementById('password-icon').src = '../img/icons/visibility_off.svg';
}

function changeInputType() {
    let icon = document.getElementById('password-icon');
    if (icon.src.includes('visibility_off.svg')) {
        icon.src = '../img/icons/visibility_on.svg';
        document.getElementById('password').type = 'text';
    } else {
        icon.src = '../img/icons/visibility_off.svg';
        document.getElementById('password').type = 'password';
    }
}




