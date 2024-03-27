const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confrim = document.getElementById('confirm');

let user = [
    {   userID: "1",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    },
    {   userID: "2",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    },
    {   userID: "3",
        email: "sofiam@gmail.com",
        password: "mypassword123",
        name: "Sofia Müller"
    }
]

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInput();
});

function checkInput() {
    const formValue = form.value.trim(); 
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim(); 
    const confirmValue = confirm.value.trim();
}