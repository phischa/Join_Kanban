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

function multiselectFocus() {
  document.getElementById("selectBox").style.border = "2px solid #25C0D4";
}

function multiselectBlur() {
  document.getElementById("selectBox").style.border = "0.063rem solid #D1D1D1";
}

//Schließen der Auswahl bei Klick außerhalb des Menüs

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

//--------------Funtions for Contacts---------------------------------

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

//filtern
function filterContacts(filterParameter) {
  filterParameter = filterParameter.toLowerCase();
  filteredContacts = [];

  for (let i = 0; i < contactsOfAddPage.length; i++) {
    if (contactsOfAddPage[i].name.toLowerCase().includes(filterParameter)) {
      filteredContacts.push(contactsOfAddPage[i]);
    }
  }

  sortFilteredContacts();
}

function sortFilteredContacts() {}

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

function addContactsToPage() {
  for (let i = 0; i < contacts.length; i++) {
    contactsOfAddPage.push(contacts[i]);
  }

  sortContacts();
}

function isAdded(Id) {
  for (let i = 0; i < assignedContacts.length; i++) {
    if (assignedContacts[i].contactID == Id) {
      return i;
    }
  }
  return -1;
}

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

function renderCanvases() {
  let canvases = document.getElementsByClassName("dropdownMenuCanvas");

  for (let i = 0; i < canvases.length; i++) {
    let canvas = canvases[i];
    id = canvas.id;

    let contact = getContactFromID(id);

    drawColoredCircle(contact.color, contact.initials, id);
  }
}

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

function renderMoreContacts() {
  let number = assignedContacts.length - 5;
  number = `+${number.toString()}`;
  drawColoredCircle("#25C0D4", number, "moreContacts");
}

function moreContactsHTML() {
  return `
  <canvas class="canvasInRenderArea" width="48" height="48" id="moreContacts"></canvas>
  `;
}

function assignedToRenderAreaHTML(i) {
  return `
        <canvas class="canvasInRenderArea" width="48" height="48" id="R${assignedContacts[i].contactID}"></canvas>
    `;
}

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

function noContactHTML() {
  return `
  <div id="noContactText">
     No contacts found for this searchparamater.
  </div>
  `;
}
