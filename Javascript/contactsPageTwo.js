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
function deletedContactList(){
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
function backToContactList(){
    document.getElementById('width-contact-container').classList.remove('d-none');
    document.getElementById('mobile-option').classList.add('d-none');
    document.getElementById('mobile-addcontact').classList.remove('d-none');
    document.getElementById('person-card-mobile').classList.add('d-none');
}

/** 
*  This function opens the edit delete container.
*/
function openMobileEditDeleteContainer(){
    document.getElementById('mobile-edit-delete-c').classList.remove('d-none');  
    document.getElementById('edit-delete-back').classList.remove('d-none');  
    document.getElementById('mobile-edit-delete-c').classList.remove('animation-close-edit-delete-window');
    document.getElementById('mobile-edit-delete-c').classList.add('animation-open-edit-delete-window'); 
}

/** 
*  This function closes the edit delete window. 
*/
function editDeleteBack(){
    document.getElementById('mobile-edit-delete-c').classList.remove('animation-open-edit-delete-window'); 
    document.getElementById('mobile-edit-delete-c').classList.add('animation-close-edit-delete-window');
    setTimeout(closeEditDeleteWindow, 800);
}

/** 
*  This function closes the edit / delete container. 
*/
function closeEditDeleteWindow(){
    document.getElementById('edit-delete-back').classList.add('d-none'); 
}

/** 
*  This function closes the delete window.
*/
function closeDeleteContact(){
    document.getElementById('delete').classList.add('d-none');
}