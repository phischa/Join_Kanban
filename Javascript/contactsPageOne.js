
let sortedContactsByName, resetBgColor = 0, lastIndex, editIndex;

/** 
*  Loads functions that are needed upfront.
*/
async function onload() {
    await loadContacts();
    renderContactList();
}

/**
 *  Show the contact-list inclusive letter, name and email. 
 */
function renderContactList(){
    if(contacts.length != 0){
    sortedContactsByName = sortContactsByName(contacts);
    let allExistedFirstLetter = allUniqueFirstLetter();

    for(let i = 0; i < allExistedFirstLetter.length; i++){

        loadFirstLetterContainer(allExistedFirstLetter[i]);
        loadContactsContactPage(allExistedFirstLetter[i]);
        }
    }
}

/**
 *  Loads the existing contact.
 */
function loadContactsContactPage(letter){
    for(let i = 0; i < contacts.length; i++){
        if(letter == sortedContactsByName[i]["name"].charAt(0).toUpperCase()){
            renderContactContainer(i);
        }
    }
}

/**
* Sorts the contacts alphabetically.
 */
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

/**
 *  Loads the first existing letter from existing contact.
 */
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

/**
 *  Show the first letter container.
 */
function loadFirstLetterContainer(firstLetter){
    let content = document.getElementById('contact-list');

    content.innerHTML += `
        <div class="firstletter-container" id="firstletter">${firstLetter}</div>
        <div class="dividing-line"></div>
    `;
}

/**
 *  Show the contacts in the list.
 */
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

/** 
* Show the person card.
*/
function openContact(i){
    editIndex = i;

    if(screen.width > 1200){
    if(i != lastIndex){
        document.getElementById('person-card').classList.remove('d-none');
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
        ifScreenMobileDisplayNone();
        showPersonCard(i);
        lastIndex = i; 
    }
}

/**
 *  Show the person card.
 */
function showPersonCard(i){
    renderPrewiewContact(i);
    let phoneNumber = spaceInPhoneNumber(sortedContactsByName[i]["phone"]);
    renderContact(i, phoneNumber);
}

/** 
* Switch display on / off from the ID.
*/
function ifScreenMobileDisplayNone(){
    document.getElementById('width-contact-container').classList.add('d-none');
    document.getElementById('mobile-contact-view').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.remove('d-none');
    document.getElementById('mobile-addcontact').classList.add('d-none');
    document.getElementById('mobile-option').classList.remove('d-none');
}

/** 
* Show Edit contact container and render its color and border.
*/
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

/** 
*  Render the HTML Code on the desktop and mobile version.
*/
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
          <div class="edit-container d_flexdirection_r" onclick="openEditContact(${i})">
            <img class="edit-icon" src="../img/icons/edit-contact-icon.svg"></img>
            <div class="edit">Edit</div>
          </div>
          <div class="delete-container d_flexdirection_r" onclick="deleteContactOfContactPage(${i})">
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

/** 
*  This function makes spaces in the phone number.
*/
function spaceInPhoneNumber(string){
    let phone = [string.slice(0, 3), " ", string.slice(3,7), " ", string.slice(7,10), " ", string.slice(10,12), " ", string.slice(12,13), " "].join('');
    return phone;
}

/** 
*  This function makes a slide effect.
*/
function animationPersonCard(){
	  let content = document.getElementById('person-card');
    content.style.animationName = "none";

  	requestAnimationFrame(() => {
	  	content.style.animationName = "";
	  });
}

/** 
*  This function opens the window add contact.
*/
function openAddContact(){
    clearInputFields();
    document.getElementById('text-contact').innerHTML = 'Add contact';
    document.getElementById('text-taskarebetter').classList.remove('d-none');
    document.getElementById('join-logo').style.transform = "translateY(-12.968rem)";
    document.getElementById('initial-person-card').classList.remove('d-none');
    document.getElementById('text-initial').innerHTML = '';
    document.getElementById('color-icon').style.backgroundColor = '';
    document.getElementById('container-editcontact').classList.add('d-none');
    document.getElementById('container-addcontact').classList.remove('d-none');
    showAddOrEditContactWindow();
    document.getElementById('add-contact-bg').classList.remove('d-none');
}

/** 
*  This function opens the window edit contact.
*/
  function openEditContact(i){
    clearInputFields();
    document.getElementById('text-contact').innerHTML = 'Edit contact';
    document.getElementById('text-taskarebetter').classList.add('d-none');
    document.getElementById('join-logo').style.transform = "translateY(-10.968rem)";
    document.getElementById('container-addcontact').classList.add('d-none');
    document.getElementById('container-editcontact').classList.remove('d-none');
    getSelectedContact(i);
    showAddOrEditContactWindow();
    document.getElementById('add-contact-bg').classList.remove('d-none');
}

/** 
*  This function clears the input fields.
*/
function clearInputFields(){
    document.getElementById('ltitlename').value = '';
    document.getElementById('ltitleemail').value = '';
    document.getElementById('ltitlephone').value = '';
}

/** 
*  Show the add or edit contact window.
*/
function showAddOrEditContactWindow(){
    document.getElementById('add-contact').classList.remove('animationcloseaddcontact');
    document.body.style.overflowY = 'hidden';
}

/** 
*   This function closes the add contact function.
*/
function closeAddContact(){
    document.getElementById('add-contact').classList.add('animationcloseaddcontact');
    setTimeout(closeWindow, 1500);
}

/** 
*  This function closes the window.
*/
function closeWindow(){
    document.getElementById('add-contact-bg').classList.add('d-none');
    document.getElementById('mobile-contact-view').classList.add('d-none');
    document.getElementById('mobile-edit-delete-c').classList.add('d-none'); 
    document.body.style.overflowY = 'hidden';
}

/** 
*  This function loads available contacts.
*/
function getSelectedContact(i){
    document.getElementById('ltitlename').value = `${sortedContactsByName[i]["name"]}`;
    document.getElementById('ltitleemail').value = `${sortedContactsByName[i]["email"]}`;
    document.getElementById('ltitlephone').value = `${sortedContactsByName[i]["phone"]}`;
    document.getElementById('initial-person-card').classList.add('d-none');
    document.getElementById('text-initial').innerHTML = `${sortedContactsByName[i]["initials"]}`;
    document.getElementById('color-icon').style.backgroundColor = `${sortedContactsByName[i]["color"]}`;
    lastIndex = 2000;
}

/** 
*  This function creates a new contact.
*/
function createContactOnContactPage(){
    let name = document.getElementById('ltitlename').value;
    let email = document.getElementById('ltitleemail').value;
    let phone = document.getElementById('ltitlephone').value;

    createContact(name, email, phone);
    deletedContactList();
    renderContactList();
    closeAddContactWithAnimation();
}

/** 
*  This function saves the edit contact.
*/
function saveEditContact(i){
    let name = document.getElementById('ltitlename').value;
    let existedName = `${sortedContactsByName[i]["name"]}`;
    let email = document.getElementById('ltitleemail').value;
    let existedEmail = `${sortedContactsByName[i]["email"]}`; 
    let phone = document.getElementById('ltitlephone').value;
    let existedPhone = `${sortedContactsByName[i]["phone"]}`;

    if(!name.localeCompare(existedName) && !email.localeCompare(existedEmail) && !phone.localeCompare(existedPhone)){
        closeAddContactWithAnimation();
    } else {
        saveEditContactOnStorage(name, email, phone, i);
        openContact(i);
        deletedContactList();
        renderContactList();
        renderContactContainer(i);
        closeAddContactWithAnimation();
    }
}

/** 
*  This function closes the add or edit contact with a slide effect.
*/
function closeAddContactWithAnimation(){
    closeAddContact();
    setTimeout(successfulSent, 1500);
    setTimeout(closeSuccessfulSent, 2300);
}

/** 
*  This function closes the window successfully.
*/
function sucessfulCreatedDisable(){
    document.getElementById('text-successfulcreated').classList.add('d-none');
}

/** 
*  This function opens the window successfully.
*/
function successfulSent(){
    document.getElementById('success-created').classList.remove('d-none');
}

/** 
*  This function closes the window successfully.
*/
function closeSuccessfulSent(){
    document.getElementById('success-created').classList.add('d-none');
}

/** 
*  This function shows the delete function.
*/
function deleteContactOfContactPage(){
    document.getElementById('delete').classList.remove('d-none');
}

/** 
*  This function deletes the selected contact in the storage.
*/
function finallyDeleted(){
    let contactID;
    contactID = contacts[editIndex]['contactID'];

    deleteContact(contactID);
    deletedContactList();
    renderContactList();
    closeDeleteContact();
    document.getElementById('person-card').classList.add('d-none');
    if(screen.width < 1200){
    backToContactList();
    }
}