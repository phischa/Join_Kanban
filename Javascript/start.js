async function initLogin() {
    loadUsers();
    loadRememberMe();
}

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    user = users.find(u => u.email == email && u.password == password);
    rememberMe(email, password);
    if(user) {
        actualUser = user;
        window.location.href = 'summary.html';
    } else {
        console.log('Kein User gefunden')
    }
}

function rememberMe(email) {
    let rememberMe = document.getElementById('remember-me').checked;
    if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
}

function loadRememberMe() {
    let rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById("email").value = rememberedEmail;
    }
}
