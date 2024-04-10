//Variables needed for handling the contacts

let contactsOfAddPage = [];
let assignedContacts = [];
let filteredContacts = [];

//----------    UI Handling --------------------------
let inputFeld = document.getElementById("inputfeld");
let expanded = false;

//-------- stop clicks in menu doing stuff from the underlying elements--------------
document
  .getElementById("multiSelectContact")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

document
  .getElementById("selectBox")
  .addEventListener("keypress", function (event) {
    event.preventDefault();
  });

inputFeld.addEventListener("keypress", function (e) {
  if (e.key === "Enter" || (e.keyCode || e.which) === 13) e.preventDefault();
  e.stopPropagation();
});

inputFeld.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
});

/**
 * function opens the select Menu of the AssignedToContacts artificial select field
 */

function showCheckboxes() {
  let checkboxes = document.getElementById("checkboxes");
  let searchField = document.getElementById("searchfield");
  let selectField = document.getElementById("selectfield");
  if (!expanded) {
    checkboxes.style.display = "flex";
    searchField.style.display = "flex";
    selectField.style.display = "none";
    inputFeld.value = "";
    inputFeld.focus();
    expanded = true;
    renderAssignedToMenu();
    renderAssignedToRenderArea();
  } else {
    checkboxes.style.display = "none";
    searchField.style.display = "none";
    selectField.style.display = "flex";
    expanded = false;
    renderAssignedToRenderArea();
  }
}

/**
 * sets the optical focus on the artifical AssigendToContacts artificial select field
 */
function multiselectFocus() {
  document.getElementById("selectBox").style.border = "2px solid #25C0D4";
}

/**
 * removes the optical focus on the artifical AssigendToContacts artificial select field
 */
function multiselectBlur() {
  document.getElementById("selectBox").style.border = "0.063rem solid #D1D1D1";
}

/**
 * function closes the assigendToContacts Menu if a
 * click of the mouse outside of that menu is detected.
 * @param {targetElement} targetElement - mouseclick on the addTaskPage
 */

function checkAssignedEventArea(targetElement) {
  let multiSelectContact = document.getElementById("multiSelectContact");

  let checkboxes = document.getElementById("checkboxes");
  let searchField = document.getElementById("searchfield");
  let selectField = document.getElementById("selectfield");

  if (expanded && !multiSelectContact.contains(targetElement)) {
    checkboxes.style.display = "none";
    searchField.style.display = "none";
    selectField.style.display = "flex";
    expanded = false;
  }
}

//--------------Functions for Contacts---------------------------------

/**
 * decides if the input requires a filtering
 */
function processInputForFilter() {
  let filterParameter = inputFeld.value;

  if (filterParameter == "") {
    filteredContacts = [];
    renderAssignedToMenu();
    renderAssignedToRenderArea();
  } else {
    filterContacts(filterParameter);
    renderFilteredAssignedToMenu();
    renderAssignedToRenderArea();
  }
}

//filtring

/**
 * functions gets a String and saves all users which names include that String
 *
 * @param {String} filterParameter - String that to be looked for in the user names
 */
function filterContacts(filterParameter) {
  filterParameter = filterParameter.toLowerCase();
  filteredContacts = [];

  for (let i = 0; i < contactsOfAddPage.length; i++) {
    if (contactsOfAddPage[i].name.toLowerCase().includes(filterParameter)) {
      filteredContacts.push(contactsOfAddPage[i]);
    }
  }
}

/**
 * sorts the contacts alphabetically
 */
function sortContacts() {
  contactsOfAddPage.sort((a, b) => {
    // Vergleiche die contactName-Eigenschaften der beiden Objekte
    const nameA = a.name.toUpperCase(); // Ignoriere Groß- und Kleinschreibung
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1; // a soll vor b stehen
    }
    if (nameA > nameB) {
      return 1; // a soll nach b stehen
    }
    return 0; // a und b sind gleich
  });

  putUserAsFirstContact();
}

/**
 * if a user is lofgged in, he is put as the first Contact and
 * his name is marked with an added (YOU) like Figma wanted it
 */
function putUserAsFirstContact() {
  if (actualUser.userID) {
    let id = actualUser.userID;
    let index;
    let firstContact;
    for (let i = 0; i < contactsOfAddPage.length; i++) {
      if (contactsOfAddPage[i].contactID == id) {
        index = i;
      }
    }

    firstContact = contactsOfAddPage[index];
    firstContact.name = firstContact.name + " (YOU)";
    contactsOfAddPage.splice(index, 1);
    contactsOfAddPage.unshift(firstContact);
  }
}

/**
 * sorts the contacts which are assigned to a task alphabeticly
 */
function sortAssignedContacts() {
  assignedContacts.sort((a, b) => {
    // Vergleiche die contactName-Eigenschaften der beiden Objekte
    const nameA = a.name.toUpperCase(); // Ignoriere Groß- und Kleinschreibung
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1; // a soll vor b stehen
    }
    if (nameA > nameB) {
      return 1; // a soll nach b stehen
    }
    return 0; // a und b sind gleich
  });
}

/**
 * function copies the contacts from the main contact array to a
 * contact array specific to this page. So that datamanipulation on this
 * page dont impact the rawdata of the whole site in case something
 * goes wrong
 */
function addContactsToPage() {
  for (let i = 0; i < contacts.length; i++) {
    contactsOfAddPage.push(contacts[i]);
  }
  sortContacts();
}

/**
 * function checks if a contact is already Assigned to the Task, by returning
 * the index of the contact in the assigend Array or the standard value for
 * not found
 * @param {String} Id
 * @returns {Number}
 */
function isAdded(Id) {
  for (let i = 0; i < assignedContacts.length; i++) {
    if (assignedContacts[i].contactID == Id) {
      return i;
    }
  }
  return -1;
}

/**
 * function removes a contact with the given ID from the Task
 * @param {String} id
 */
function addToRemoveFromTask(id) {
  let contact = getAddTaskContactFromID(id);

  if (isAdded(id) > -1) {
    let index = isAdded(id);
    assignedContacts.splice(index, 1);
  } else {
    assignedContacts.push(contact);
  }

  sortAssignedContacts();
  processInputForFilter();
  renderAssignedToRenderArea();
}

/**
 * functin is given an ID of a contact on this page and returns the contact-Object, when found.
 * @param {String} id
 * @returns {contact}
 */
function getAddTaskContactFromID(id) {
  for (let i = 0; i < contactsOfAddPage.length; i++) {
    if (contactsOfAddPage[i].contactID == id) {
      return contactsOfAddPage[i];
    }
  }
  console.warn("Contact with given ID not found in contactsOfAddPage");
  return null;
}

//---------- Render and HTML

/**
 * function renders the expanded select Menu of the Contacts
 * when they are filtered by userInput
 */
function renderFilteredAssignedToMenu() {
  let menu = document.getElementById("checkboxes");

  menu.innerHTML = "";

  for (let i = 0; i < filteredContacts.length; i++) {
    let checkIMG;
    if (isAdded(filteredContacts[i].contactID) > -1) {
      checkIMG = "check-button-mobile-check.svg";
    } else {
      checkIMG = "check-button-mobile-uncheck.svg";
    }

    menu.innerHTML += getFilterOptionRowHTML(i, checkIMG);
  }
  if (filteredContacts.length == 0) {
    menu.innerHTML = noContactHTML();
  }

  renderAssignedToRenderArea();
  renderCanvases();
  renderCanvasesInAssignedToRenderArea();
}

/**
 * functions renders the unfiltered select Menu of Contacts
 */
function renderAssignedToMenu() {
  let menu = document.getElementById("checkboxes");

  menu.innerHTML = "";

  for (let i = 0; i < contactsOfAddPage.length; i++) {
    let checkIMG;
    if (isAdded(contactsOfAddPage[i].contactID) > -1) {
      checkIMG = "check-button-mobile-check.svg";
    } else {
      checkIMG = "check-button-mobile-uncheck.svg";
    }

    menu.innerHTML += getOptionRowHTML(i, checkIMG);
  }
  renderAssignedToRenderArea();
  renderCanvases();
  renderCanvasesInAssignedToRenderArea();
}

/**
 * function renders the nameSymbols in the expanded assigendTo select Menu
 */
function renderCanvases() {
  let canvases = document.getElementsByClassName("dropdownMenuCanvas");

  for (let i = 0; i < canvases.length; i++) {
    let canvas = canvases[i];
    id = canvas.id;

    let contact = getContactFromID(id);

    drawColoredCircle(contact.color, contact.initials, id);
  }
}

/**
 * function renders the nameSymbols in the field on the page, where
 * the namesymbols are shown to represent the assigend contacts
 */
function renderCanvasesInAssignedToRenderArea() {
  let canvases = document.getElementsByClassName("canvasInRenderArea");

  for (let i = 0; i < canvases.length; i++) {
    let canvas = canvases[i];
    id = canvas.id;
    if (canvas.id != "moreContacts") {
      let contactId = id.slice(1);
      let contact = getContactFromID(contactId);
      drawColoredCircle(contact.color, contact.initials, id);
    } else {
      renderMoreContacts();
    }
  }
}

/**
 * function renders the field on the page, where the namesymbols
 * of the assigned Contacts need to appear by constructing canvasses there
 */
function renderAssignedToRenderArea() {
  let amount;
  area = document.getElementById("assignedContactsRenderArea");
  area.innerHTML = "";

  if (assignedContacts.length >= 5) {
    amount = 5;
  } else {
    amount = assignedContacts.length;
  }

  for (let i = 0; i < amount; i++) {
    area.innerHTML += assignedToRenderAreaHTML(i);
  }

  if (assignedContacts.length > 5) {
    area.innerHTML += moreContactsHTML();
  }

  renderCanvasesInAssignedToRenderArea();
}

/**
 * function renders the specialcanvas that indicates that more contacts
 * are assigned then are shown by the namesymbols
 */
function renderMoreContacts() {
  let number = assignedContacts.length - 5;
  number = `+${number.toString()}`;
  drawColoredCircle("#25C0D4", number, "moreContacts");
}

/**
 * html code for constructing a canvas for the symbol that indivates that more
 * contacts are assigned than are shown
 * @returns {String} -HTML CODE
 */
function moreContactsHTML() {
  return `
  <canvas class="canvasInRenderArea" width="48" height="48" id="moreContacts"></canvas>
  `;
}

/**
 * html Code for constructing a canvas for the namesymbol of an assigend Contact in the
 * area where assigend Contacts are shown by their namesymbol
 * @param {Number} i - index in the array
 * @returns {String} - HTML CODE
 */
function assignedToRenderAreaHTML(i) {
  return `
        <canvas class="canvasInRenderArea" width="48" height="48" id="R${assignedContacts[i].contactID}"></canvas>
    `;
}

/**
 * html code for an unfiltered row in the expanded select Contacts Menu
 * @param {Number} i - index in the array
 * @param {String} checkIMG - name of the image that should be shown as checked or unchecked
 * @returns {String} - HTML CODE
 */
function getOptionRowHTML(i, checkIMG) {
  return ` 
    
     <label class="optionRow" for="one" id="label${contactsOfAddPage[i].contactID}" onclick="addToRemoveFromTask('${contactsOfAddPage[i].contactID}')">
         <canvas class="dropdownMenuCanvas" width="48" height="48" id="${contactsOfAddPage[i].contactID}"></canvas>
         <div class="boxNameAndSelect">
             ${contactsOfAddPage[i].name}
             <img src="../img/icons/${checkIMG}" id="four" />
         </div>
     </label>
 
 
 `;
}

/**
 * html code for an filtered row in the expanded select Contacts Menu
 * @param {*} i - index in the array
 * @param {*} checkIMG - name if the image that should be shown as checked or unchecked
 * @returns {String} - HTML CODE
 */
function getFilterOptionRowHTML(i, checkIMG) {
  return ` 
    
     <label class="optionRow" for="one" id="label${filteredContacts[i].contactID}" onclick="addToRemoveFromTask('${filteredContacts[i].contactID}')">
         <canvas class="dropdownMenuCanvas" width="48" height="48" id="${filteredContacts[i].contactID}"></canvas>
         <div class="boxNameAndSelect">
             ${filteredContacts[i].name}
             <img src="../img/icons/${checkIMG}" id="four" />
         </div>
     </label>
 
 
 `;
}

/**
 * html code for the filtered row in the expande selectContacts Menu when
 * no conbtact is found that fits the search parameter.
 * @returns {String} - HTML CODE
 */
function noContactHTML() {
  return `
  <div id="noContactText">
     No contacts found for this search parameter.
  </div>
  `;
}
