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

function passwordIconChange() {
    let icon = document.getElementById('password-icon');
    if (icon.src.includes('lock.svg')) {
        icon.src = '../img/icons/checkbox-checked.svg';
    } else {
        check.src = '../img/icons/checkbox-default.svg';
    }
}




