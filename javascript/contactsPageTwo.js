/** 
*  This function add all Listeners for the add contact window.
*/
function addListenerForAddContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let eventButton = document.getElementById('button-createcontact');
    let allInputFields = [document.getElementById('ltitlename'), document.getElementById('ltitleemail'), document.getElementById('ltitlephone')];

    allInputFields.forEach(listenerInputfield => {
        listenerInputfield.addEventListener("keyup", checkValidityNameEmailPhone);
    });
    eventButton.addEventListener("mouseover", validityFalseAboveButtonRedBorder);
    eventButton.addEventListener("mouseout", validityFalseLeaveButtonWhiteBorder);
    statusValidationName.addEventListener("input", capitalizeFirstLetterInName);
}

/** 
*  This function remove all Listeners for the add contact window.
*/
function removeListenerForAddContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let eventButton = document.getElementById('button-createcontact');
    let allInputFields = [document.getElementById('ltitlename'), document.getElementById('ltitleemail'), document.getElementById('ltitlephone')];

    document.getElementById('button-createcontact').style.backgroundColor='#2A3647';
    document.getElementById('button-createcontact').disabled = true;
    allInputFields.forEach(listenerInputfield => {
        listenerInputfield.removeEventListener("keyup", checkValidityNameEmailPhone);
    });
    eventButton.removeEventListener("mouseover", validityFalseAboveButtonRedBorder);
    eventButton.removeEventListener("mouseout", validityFalseLeaveButtonWhiteBorder);
    statusValidationName.removeEventListener("input", capitalizeFirstLetterInName);
}

let myStatusEditContact = false;
/** 
*  This function opens the window edit contact.
*/
function openEditContact(i) {
    clearInputFields();
    document.getElementById('text-contact').innerHTML = 'Edit contact';
    document.getElementById('text-taskarebetter').classList.add('d-none');
    document.getElementById('join-logo').style.transform = "translateY(-10.968rem)";
    document.getElementById('container-addcontact').classList.add('d-none');
    document.getElementById('container-editcontact').classList.remove('d-none');
    getSelectedContact(i);
    showAddOrEditContactWindow();
    document.getElementById('add-contact-bg').classList.remove('d-none');
    addListenerForEditContact();
    myStatusEditContact = false;
    statusOverwriting = false;
}

/** 
*  This function clears the input fields.
*/
function clearInputFields() {
    document.getElementById('ltitlename').value = '';
    document.getElementById('ltitleemail').value = '';
    document.getElementById('ltitlephone').value = '';
}

/** 
*  Show the add or edit contact window.
*/
function showAddOrEditContactWindow() {
    document.getElementById('add-contact').classList.remove('animationcloseaddcontact');
    document.body.style.overflowY = 'hidden';
}

/** 
*   This function closes the add contact function.
*/
function closeAddContact() {
    document.getElementById('add-contact').classList.add('animationcloseaddcontact');
    setTimeout(closeWindow, 1500);
}

/** 
*  This function closes the window.
*/
function closeWindow() {
    document.getElementById('add-contact-bg').classList.add('d-none');
    document.getElementById('mobile-contact-view').classList.add('d-none');
    document.getElementById('mobile-edit-delete-c').classList.add('d-none');
    document.body.style.overflowY = 'hidden';
}

/** 
*  This function loads available contacts.
*/
function getSelectedContact(i) {
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
function createContactOnContactPage() {
    let name = document.getElementById('ltitlename').value;
    let email = document.getElementById('ltitleemail').value;
    let phone = document.getElementById('ltitlephone').value;

    createContact(name, email, phone);
    removeListenerForAddContact();
    deletedContactList();
    renderContactList();
    closeAddContactWithAnimation();
}

/** 
*  This function saves the edit contact.
*/
let statusOverwriting = false;
function saveEditContact(i) {
    let name = document.getElementById('ltitlename').value;
    let existedName = `${sortedContactsByName[i]["name"]}`;
    let email = document.getElementById('ltitleemail').value;
    let existedEmail = `${sortedContactsByName[i]["email"]}`;
    let phone = document.getElementById('ltitlephone').value;
    let existedPhone = `${sortedContactsByName[i]["phone"]}`;

    if(!name.localeCompare(existedName) && !email.localeCompare(existedEmail) && !phone.localeCompare(existedPhone)) {
        closeAddContactWithAnimation();
    } else {
        saveSelectedContact(name, email, phone,i);
    }
}

/**
 * In this function are all under function for save the edit contact.
 */
function saveSelectedContact(name, email, phone,i){
    if(!statusOverwriting){
        overwritingAvaibleContact(name, email, phone);
        statusOverwriting = true;
    }
    removeListenerForEditContact();
    openContact(i);
    renderContactContainer(i);
    deletedContactList();
    renderContactList();
}

/**
 * This function save the selected edit contact of the contact page.
 */
async function overwritingAvaibleContact(name, email, phone){
    contacts[editIndex]['name'] = name;
    contacts[editIndex]['email'] = email;
    contacts[editIndex]['phone'] = phone; 
    contacts[editIndex]['initials'] = getInitials(name),
    await storeContacts();
}

/** 
*  This function closes the add or edit contact with a slide effect.
*/
function closeAddContactWithAnimation() {
    closeAddContact();
    setTimeout(successfulSent, 1500);
    setTimeout(closeSuccessfulSent, 2300);
}

/** 
*  This function closes the window successfully.
*/
function sucessfulCreatedDisable() {
    document.getElementById('text-successfulcreated').classList.add('d-none');
}

/** 
*  This function opens the window successfully.
*/
function successfulSent() {
    document.getElementById('success-created').classList.remove('d-none');
}

/** 
*  This function closes the window successfully.
*/
function closeSuccessfulSent() {
    document.getElementById('success-created').classList.add('d-none');
}

/** 
*  This function shows the delete function.
*/
function deleteContactOfContactPage() {
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

/** 
*  This function deletes contact list.
*/
function deletedContactList() {
    content = document.getElementById('contact-list');
    content.innerHTML = '';
}

/* 
*   Insert or fade out of the mobile-version
*/
let showContactList = window.matchMedia('(min-width: 1201px)');
showContactList.addEventListener("resize", showAgainContactList);

function showAgainContactList(e) {
    if (e.matches) {
        document.getElementById('width-contact-container').classList.remove('d-none');
        document.getElementById('mobile-edit-delete-c').classList.add('d-none');
        document.getElementById('person-card-mobile').classList.add('d-none');
        document.getElementById('mobile-name').classList.add('d-none');
        document.getElementById('mobile-option').classList.add('d-none');
        document.getElementById('mobile-addcontact').classList.remove('d-none');
    }
}

/** 
*  If the contact appears in the mobile version, you can push the arrow and go back.
*/
function backToContactList() {
    document.getElementById('width-contact-container').classList.remove('d-none');
    document.getElementById('mobile-option').classList.add('d-none');
    document.getElementById('mobile-addcontact').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.add('d-none');
}

/** 
*  This function opens the edit delete container.
*/
function openMobileEditDeleteContainer() {
    document.getElementById('mobile-edit-delete-c').classList.remove('d-none');
    document.getElementById('edit-delete-back').classList.remove('d-none');
    document.getElementById('mobile-edit-delete-c').classList.remove('animation-close-edit-delete-window');
    document.getElementById('mobile-edit-delete-c').classList.add('animation-open-edit-delete-window');
}

/** 
*  This function closes the edit delete window. 
*/
function editDeleteBack() {
    document.getElementById('mobile-edit-delete-c').classList.remove('animation-open-edit-delete-window');
    document.getElementById('mobile-edit-delete-c').classList.add('animation-close-edit-delete-window');
    setTimeout(closeEditDeleteWindow, 800);
}

/** 
*  This function closes the edit / delete container. 
*/
function closeEditDeleteWindow() {
    document.getElementById('edit-delete-back').classList.add('d-none');
}

/** 
*  This function closes the delete window.
*/
function closeDeleteContact() {
    document.getElementById('delete').classList.add('d-none');
}

/** 
*  This function add all Listeners for the edit contact window.
*/
function addListenerForEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let eventButton = document.getElementById('button-save');
    let allInputFields = [document.getElementById('ltitlename'), document.getElementById('ltitleemail'), document.getElementById('ltitlephone')];

    allInputFields.forEach(listenerInputfield => {
        listenerInputfield.addEventListener("keyup", checkEditContactValidityNameEmailPhone);
    });
    eventButton.addEventListener("mouseover", validityFalseAboveButtonRedBorderEditContact);
    eventButton.addEventListener("mouseout", validityFalseLeaveButtonWhiteBorderEditContact);
    statusValidationName.addEventListener("input", capitalizeFirstLetterInName);
}

/** 
*  This function remove all Listeners for the edit contact window.
*/
function removeListenerForEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let eventButton = document.getElementById('button-save');
    let allInputFields = [document.getElementById('ltitlename'), document.getElementById('ltitleemail'), document.getElementById('ltitlephone')];

    allInputFields.forEach(listenerInputfield => {
        listenerInputfield.addEventListener("keyup", checkEditContactValidityNameEmailPhone);
    });
    eventButton.removeEventListener("mouseover", validityFalseAboveButtonRedBorderEditContact);
    eventButton.removeEventListener("mouseout", validityFalseLeaveButtonWhiteBorderEditContact);
    statusValidationName.removeEventListener("input", capitalizeFirstLetterInName);
}

/**
 *  This function checks the validity of input name, e-mail and phone. If it is correct, the function saveContact() opens. 
 */
function checkEditContactValidityNameEmailPhone(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');
    let eventButton = document.getElementById('button-save');

    if(statusValidationName.checkValidity() && statusValidationEmail.checkValidity() && statusValidationPhone.checkValidity()){
        document.getElementById('button-save').disabled = false;
        document.getElementById('button-save').style.backgroundColor='#2A3647';
        document.getElementById('button-save').style.cursor = "pointer";
    
        eventButton.addEventListener("click", function () {
            if (!myStatusEditContact) {
                saveEditContact(editIndex);
                myStatusEditContact = true;
            }
        });
    } else {
        document.getElementById('button-save').disabled = true;
        document.getElementById('button-save').style.backgroundColor='#E5E5E5';
        document.getElementById('button-save').style.cursor = "default";
    }
}
    
/**
*  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
*  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be red.
*/
function validityFalseAboveButtonRedBorderEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');

    removesFocusFromInputField();
    changeBackColorFromButtonEditContactPage();
    checkValidationByTrueBorderRed(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function changes back the color for the create contact button on the addcontact page.
 */
function changeBackColorFromButtonEditContactPage(){
    let eventButton = document.getElementById('button-save');

    if(eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#E5E5E5';
        document.getElementById('button-save').style.cursor = "default";
    }
    if(!eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#25C0D4';
    }
}

/**
*  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
*  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be white.
*/
function validityFalseLeaveButtonWhiteBorderEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');

    changeColorFromButtonEditContactPage();
    checkValidationByTrueBorderInvisible(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function changes back the color for the create contact button on the editcontact page.
 */
function changeColorFromButtonEditContactPage(){
    let eventButton = document.getElementById('button-save');

    if(eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#E5E5E5';
    }
    if(!eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#2A3647';
    }
}

function deleteContact(){
    document.getElementById('delete').classList.remove('d-none');
}