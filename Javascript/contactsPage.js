let contacts = [

{
    contactID: 0,
    name: "Anton Mayer",
    email: "antom@gmail.com",
    phone: "+491111111111",
    initials: "AM",
    color: "#FF7A00"
},
{
    contactID: 1,
    name: "Anja Schulz",
    email: "schulz@hotmail.com",
    phone: "",
    initials: "AS",
    color: "#9327FF"
},
{
    contactID: 2,
    name: "Benedikt Ziegler",
    email: "benedikt@gmail.com",
    phone: "",
    initials: "BZ",
    color: "#6E52FF"
},
{
    contactID: 3,
    name: "David Eisenberg",
    email: "davidberg@gmail.com",
    phone: "",
    initials: "DE",
    color: "#FC71FF"
},
{
    contactID: 4,
    name: "Eva Fischer",
    email: "eva@gmail.com",
    phone: "",
    initials: "EF",
    color: "#FFBB2B"
},
{
    contactID: 5,
    name: "Emmanuel Mauer",
    email: "emmanuelma@gmail.com",
    phone: "",
    initials: "EM",
    color: "#1FD7C1"
},
{
    contactID: 6,
    name: "Marcel Bauer",
    email: "bauer@gmail.com",
    phone: "",
    initials: "MB",
    color: "#462F8A"
},
{
    contactID: 7,
    name: "Tatjana Wolf",
    email: "wolf@gmail.com",
    phone: "+492222222222",
    initials: "EM",
    color: "#FF4646"
}
];


let sortedContactsByName = sortContactsByName(contacts);


function sortContactsByName(contacts) {
    contacts.sort((a, b) => {
        if (a.name < b.name) {return -1;
    	}
        if (a.name > b.name) {return 1;
        }
	    return 0;
    });
    return contacts;
}


function renderContactList(){
let firstLetter = sortedContactsByName[0]['name'].charAt(0).toUpperCase();
loadContainerFirstLetter(firstLetter);
}


function loadContainerFirstLetter(firstLetter){
    let content = document.getElementById('contact-list');

    content.innerHTML += `
        <div class="firstletter-container" id="firstletter">${firstLetter}</div>
        <div class="dividing-line"></div>
    `;
}


function renderContactContainer(){
    let content = document.getElementById('contact-list');

    content.innerHTML += `
    <div class="preview-contact-container d_flexdirection_r_c">
      <section class="circle-area d_flex_c_c">
        <div class="initial">AM</div>
    </section>
      <div class="name-email-container d_flex_column_sb">
        <div-white class="first-last-name">Anton Mayer</div-white>
        <div class="email">anton@g-mail.com</div>
      </div>
    </div>
    `;
}