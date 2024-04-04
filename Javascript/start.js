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
        changeBorderColor();
        wrongPasswordText();
    }
}

function changeBorderColor() {
    document.getElementById('input-field').classList.add('border-red'); 
}

function wrongPasswordText() {
    document.getElementById('wrong-password').classList.remove('d-none');
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

function changeIconToVisibilityOff() {
    document.getElementById('password-icon').src = '../img/icons/visibility_off.svg';
    document.getElementById('input-field').classList.remove('border-red');
    document.getElementById('wrong-password').classList.add('d-none');
}

function changeIconToLock() {
    document.getElementById('password-icon').src = '../img/icons/lock.svg';
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




