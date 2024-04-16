let contacts = [
{
    contactID: 0,
    name: "Anton Mayer",
    email: "antom@gmail.com",
    phone: "491111111111",
    initials: "AM",
    color: "#FF7A00"
},
{
    contactID: 1,
    name: "Anja Schulz",
    email: "schulz@hotmail.com",
    phone: "493333333333",
    initials: "AS",
    color: "#9327FF"
},
{
    contactID: 2,
    name: "Benedikt Ziegler",
    email: "benedikt@gmail.com",
    phone: "496666666666",
    initials: "BZ",
    color: "#6E52FF"
},
{
    contactID: 3,
    name: "David Eisenberg",
    email: "davidberg@gmail.com",
    phone: "494444444444",
    initials: "DE",
    color: "#FC71FF"
},
{
    contactID: 4,
    name: "Eva Fischer",
    email: "eva@gmail.com",
    phone: "499999999999",
    initials: "EF",
    color: "#FFBB2B"
},
{
    contactID: 5,
    name: "Emmanuel Mauer",
    email: "emmanuelma@gmail.com",
    phone: "495555555555",
    initials: "EM",
    color: "#1FD7C1"
},
{
    contactID: 6,
    name: "Marcel Bauer",
    email: "bauer@gmail.com",
    phone: "497777777777",
    initials: "MB",
    color: "#462F8A"
},
{
    contactID: 7,
    name: "Tatjana Wolf",
    email: "wolf@gmail.com",
    phone: "492222222222",
    initials: "EM",
    color: "#FF4646"
}
];


let sortedContactsByName = sortContactsByName(contacts);
let resetBgColor = 0;
let lastIndex;


async function renderContactList(){
    let allExistedFirstLetter = allUniqueFirstLetter();

    for(let i = 0; i < allExistedFirstLetter.length; i++){

        loadFirstLetterContainer(allExistedFirstLetter[i]);
        loadContacts(allExistedFirstLetter[i]);
    }
//    await loadActualUser();
}


function loadContacts(letter){
    for(let i = 0; i < contacts.length; i++){
        if(letter == sortedContactsByName[i]["name"].charAt(0).toUpperCase()){
            renderContactContainer(i);
        }
    }
}

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


function allUniqueFirstLetter(){
    let firstLetter, allUniqueFirstLetter = [];

    for(let i = 0; i < contacts.length; i++){
        firstLetter = sortedContactsByName[i]["name"].charAt(0).toUpperCase();
        if(!allUniqueFirstLetter.includes(firstLetter)){
            allUniqueFirstLetter.push(firstLetter);
        }
    }
    return allUniqueFirstLetter;
}


function loadFirstLetterContainer(firstLetter){
    let content = document.getElementById('contact-list');

    content.innerHTML += `
        <div class="firstletter-container" id="firstletter">${firstLetter}</div>
        <div class="dividing-line"></div>
    `;
}


function renderContactContainer(i){
    let content = document.getElementById('contact-list');

    content.innerHTML += `
    <div class="preview-contact-container d_flexdirection_r_c" id="contact-container${i}" onclick="openContact(${i})">
      <section class="circle-area d_flex_c_c" id="border-circle${i}" style="background-color: ${sortedContactsByName[i]["color"]};">
        <div class="initial">${sortedContactsByName[i]["initials"]}</div>
    </section>
      <div class="name-email-container d_flex_column_sb">
        <div-white class="first-last-name" id="first-last-name${i}">${sortedContactsByName[i]["name"]}</div-white>
        <div class="email">${sortedContactsByName[i]["email"]}</div>
      </div>
    </div>
    `;
}


function openContact(i){
    if(screen.width > 1200){
    if(i != lastIndex){
    renderPrewiewContact(i);
    let phoneNumber = spaceInPhoneNumber(sortedContactsByName[i]["phone"]);
    if(screen.width >= 1201){
        animationPersonCard();
    }
    renderContact(i, phoneNumber);
    lastIndex = i;  
        }
    }
    if(screen.width < 1200){
        document.getElementById('width-contact-container').classList.add('d-none');
        document.getElementById('mobile-contact-view').classList.remove('d-none');
        document.getElementById('person-card-mobile').classList.remove('d-none');
        document.getElementById('mobile-addcontact').classList.add('d-none');
        document.getElementById('mobile-option').classList.remove('d-none');
        renderPrewiewContact(i);
        let phoneNumber = spaceInPhoneNumber(sortedContactsByName[i]["phone"]);
        renderContact(i, phoneNumber);
        console.log(i);
        lastIndex = i;  
    }
}


function renderPrewiewContact(i){
    let tablinks;

    document.getElementById(`contact-container${resetBgColor}`).style.backgroundColor = '#FFFFFF';
    document.getElementById(`first-last-name${resetBgColor}`).style.color = '#000000';
    document.getElementById(`border-circle${resetBgColor}`).style.border = '';

    tablinks = document.getElementsByClassName("preview-contact-container");
      for (j = 0; j < tablinks.length; j++) {
        tablinks[j].style.backgroundColor = "";
    }

    document.getElementById(`contact-container${i}`).style.backgroundColor = '#2A3647';
    document.getElementById(`first-last-name${i}`).style.color = '#FFFFFF';
    document.getElementById(`border-circle${i}`).style.border = '2px solid #FFFFFF';
    resetBgColor = i;
}


function renderContact(i,phoneNumber){
    let content = document.getElementById('person-card');
    let contentMobile = document.getElementById('person-card-mobile');
    
    content.innerHTML = contentMobile.innerHTML = `
    <div class="person-card-headline d_flexdirection_r_c">
    <div class="circle d_flex_c_c" style="background-color: ${sortedContactsByName[i]["color"]};">
      <div class="circle-initial" id="initial">${sortedContactsByName[i]["initials"]}</div>
    </div>
    <div class="mobile-name" id="mobile-name">${sortedContactsByName[i]["name"]}</div>
    <div class="name-container d_flex_column_sb">
      <div class="distance-name"></div>
      <div class="name" id="name">${sortedContactsByName[i]["name"]}</div>
      <div class="d_flexdirection_r_c">
        <div class="edit-delete-container d_flexdirection_r">
          <div class="edit-container d_flexdirection_r" onclick="openAddContact(${i})">
            <img class="edit-icon" src="../img/icons/edit-contact-icon.svg"></img>
            <div class="edit">Edit</div>
          </div>
          <div class="delete-container d_flexdirection_r" onclick="deleteContact(${i})">
            <img class="delete-icon" src="../img/icons/delete-contact-icon.svg"></img>
            <div class="edit">Delete</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="contact-information">
        <div class="text d_flex_c">Contact Information</div>
        <div class="address d_flex_column_sb">
            <div class="email-container d_flex_column_sb">
                <h2>Email</h2>
                <h3 id="email">${sortedContactsByName[i]["email"]}</h3>
            </div>
            <div class="phone-container d_flex_column_sb">
                <h2>Phone</h2>
                <h4 id="telephonenumber">+${phoneNumber}</h4>
            </div>
        </div>
    </div>
    `;
}


function spaceInPhoneNumber(string){
    let phone = [string.slice(0, 3), " ", string.slice(3,7), " ", string.slice(7,10), " ", string.slice(10,12), " ", string.slice(12,13), " "].join('');
return phone;
}


function animationPersonCard(){
	  let content = document.getElementById('person-card');
    content.style.animationName = "none";

  	requestAnimationFrame(() => {
	  	content.style.animationName = "";
	  });
}


function openAddContact(i){
    document.getElementById('ltitlename').value = '';
    document.getElementById('ltitleemail').value = '';
    document.getElementById('ltitlephone').value = '';
    document.getElementById('addcontact-cancel-button').innerHTML = `Cancel
    <img class="dimension-close-icon" src="../img/icons/close.svg"></img>`;
    document.getElementById('createcontact-button').innerHTML = `Create contact
    <img class="dimension-check-icon" id="tzu" src="../img/icons/check-icon-addtask.svg"></img>`;
    
    if(i != undefined){
    getSelectedContact(i);
   // let changeIdButton = document.getElementById('createcontact-button');
   // changeIdButton.id = "save-button";
    } 

    document.getElementById('add-contact').classList.remove('animationcloseaddcontact');
    document.body.style.overflowY = 'hidden';
    document.getElementById('add-contact-bg').classList.remove('d-none');
  }


function closeAddContact(){
    document.getElementById('add-contact').classList.add('animationcloseaddcontact');
    setTimeout(closeWindow, 1500);
}


function closeWindow(){
    document.getElementById('add-contact-bg').classList.add('d-none');
    document.getElementsByClassName('mobile-contact-view').classList.add('d-none');
    document.getElementById('mobile-edit-delete-c').classList.add('d-none'); 
    document.body.style.overflowY = 'visible';
}


function getSelectedContact(i){
    document.getElementById('ltitlename').value = `${sortedContactsByName[i]["name"]}`;
    document.getElementById('ltitleemail').value = `${sortedContactsByName[i]["email"]}`;
    document.getElementById('ltitlephone').value = `${sortedContactsByName[i]["phone"]}`;
    document.getElementById('initial-person-card').classList.add('d-none');
    document.getElementById('text-initial').innerHTML = `${sortedContactsByName[i]["initials"]}`;
    document.getElementById('color-icon').style.backgroundColor = `${sortedContactsByName[i]["color"]}`;
    document.getElementById('createcontact-button').innerHTML = `Save<img class="dimension-check-icon" id="tzu" src="../img/icons/check-icon-addtask.svg"></img>`;
   // let changeIdButton = document.getElementById('createcontact-button');
    // changeIdButton.id = "save-button";
    //document.getElementById('save-button').addEventListener("click", sucessfulCreatedDisable);
}


function saveContact(){
    let ltitlename = document.getElementById('ltitlename').value;
    let ltitleemail = document.getElementById('ltitleemail').value;
    let ltitlephone = document.getElementById('ltitlephone').value;

    console.log(ltitlename);
    console.log(ltitleemail);
    console.log(ltitlephone);

    closeAddContact();
    setTimeout(successfulSent, 1500);
    setTimeout(closeSuccessfulSent, 2300);
}


function sucessfulCreatedDisable(){
    document.getElementById('text-successfulcreated').classList.add('d-none');
}


function successfulSent(){
    document.getElementById('success-created').classList.remove('d-none');
}


function closeSuccessfulSent(){
    document.getElementById('success-created').classList.add('d-none');
}


function deleteContact(){
    document.getElementById('delete').classList.remove('d-none');
}


let showContactList = window.matchMedia('(min-width: 1201px)');

function showAgainContactList(e) {
  if (e.matches) {
    document.getElementById('width-contact-container').classList.remove('d-none');
    document.getElementById('mobile-edit-delete-c').classList.add('d-none');  
    document.getElementById('mobile-addcontact').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.add('d-none');
    document.getElementById('mobile-option').classList.add('d-none');
    document.getElementById('mobile-name').classList.add('d-none');
    } 
}

showContactList.addListener(showAgainContactList);


function backToContactList(){
    document.getElementById('width-contact-container').classList.remove('d-none');
    document.getElementById('mobile-edit-delete-c').classList.add('d-none'); 
    document.getElementById('mobile-addcontact').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.add('d-none');
    document.getElementById('mobile-option').classList.add('d-none');
}


function openMobileEditDeleteContainer(){
    document.getElementById('mobile-edit-delete-c').classList.remove('d-none');  
    document.getElementById('edit-delete-back').classList.remove('d-none');  
}

function editDeleteBack(){
    document.getElementById('edit-delete-back').classList.add('d-none');  
}

function closeDeleteContact(){
    document.getElementById('delete').classList.add('d-none');
}