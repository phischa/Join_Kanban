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

function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById("email").value = rememberedEmail;
    }
}

function rememberMe() {
    let checkbox = document.getElementById('remember-me');
    email = document.getElementById('email').value;
    
    if (checkbox.src = '../img/icons/checkbox-default.svg') {
        checkbox.src = '../img/icons/checkbox-checked.svg';
        localStorage.setItem('rememberedEmail', email);

    } else {
        checkbox.src = '../img/icons/checkbox-default.svg';
        localStorage.removeItem('rememberedEmail');
    }
}


