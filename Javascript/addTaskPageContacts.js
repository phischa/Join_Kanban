let contactsOfAddPage=[];
let assignedContacts=[];







//----------    UI Handling --------------------------
let inputFeld = document.getElementById('inputfeld');
let expanded = false;


document.getElementById('multiSelectContact').addEventListener('click', function(event){
    event.stopPropagation();
});






document.getElementById('selectBox').addEventListener("keypress", function(event) {
    event.preventDefault();
  });
  
  inputFeld.addEventListener("keypress", function(e) {
    if (e.key === "Enter" || (e.keyCode || e.which) === 13)
        e.preventDefault();
      e.stopPropagation();
  });
  
  
  inputFeld.addEventListener('click',function (e) 
      {
      // Ereignis behandeln
      
          e.preventDefault();
          e.stopPropagation();
      });





      function showCheckboxes() {
        let checkboxes = document.getElementById("checkboxes");
        let searchField = document.getElementById("searchfield");
        let selectField = document.getElementById("selectfield");
        if (!expanded) {
          checkboxes.style.display = "flex";
          searchField.style.display= 'flex';
          selectField.style.display="none";
          inputFeld.focus();
          expanded = true;
          renderAssignedToMenu();
          renderAssignedToRenderArea();
          
        } else {
          checkboxes.style.display = "none";
          searchField.style.display= 'none';
          selectField.style.display="flex";
          expanded = false;
          renderAssignedToRenderArea();
        }
      }
      

      function multiselectFocus(){
    
        document.getElementById('selectBox').style.border = '2px solid #25C0D4';
    }
    
    function multiselectBlur(){
        document.getElementById('selectBox').style.border = '0.063rem solid #D1D1D1';
    }










//--------------Funtions for Contacts---------------------------------    




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


function addContactsToPage(){
    
    
    
    for (let i =0;i< contacts.length; i++){
        contactsOfAddPage.push(contacts[i]);
    }
    
    sortContacts()
}



function isAdded(Id){
    
    for (let i = 0; i< assignedContacts.length; i++){
        if (assignedContacts[i].contactID == Id){
            
            return i;
        }
    }
    return -1;



    
}


function addToRemoveFromTask(id){
    
    let contact = getAddTaskContactFromID(id);

    if(isAdded(id)>-1){
        let index = isAdded(id);
        assignedContacts.splice(index, 1);
    } else {
        assignedContacts.push(contact);
    }
    sortAssignedContacts();

    renderAssignedToMenu();
    renderAssignedToRenderArea();
}


function getAddTaskContactFromID(id){
    
    for(let i =0 ; i < contactsOfAddPage.length; i++){
        if (contactsOfAddPage[i].contactID == id){
            return contactsOfAddPage[i];
        }
    }
    console.warn("Contact with given ID not found in contactsOfAddPage");
    return null;
}






//---------- Render and HTML

function renderAssignedToMenu(){

    let menu = document.getElementById('checkboxes');

    menu.innerHTML='';

    for (let i = 0; i < contactsOfAddPage.length; i++){

        let checkIMG;
        if(isAdded(contactsOfAddPage[i].contactID)>-1){
            
            checkIMG ='check-button-mobile-check.svg' ;
       }
       else{
        
        checkIMG = 'check-button-mobile-uncheck.svg';
    } 
        
        menu.innerHTML += getOptionRowHTML(i, checkIMG);
         

    }
renderAssignedToRenderArea();
renderCanvases();
renderCanvasesInAssignedToRenderArea() 
                    

}

function renderCanvases(){
    
    
    
    let canvases = document.getElementsByClassName("dropdownMenuCanvas");

    

    for (let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i];
        id = canvas.id;
        
        let contact =getContactFromID(id);
       
       
        drawColoredCircle(contact.color, contact.initials, id);
        
    }

    
    
    
    
}

function renderCanvasesInAssignedToRenderArea(){
    
    
    
    let canvases = document.getElementsByClassName('canvasInRenderArea')


    

    for (let i = 0; i < canvases.length; i++) {
        let canvas = canvases[i];
        id = canvas.id;
        
        let contactId = id.slice(1);
        
        let contact = getContactFromID(contactId);
        
       
       
        drawColoredCircle(contact.color, contact.initials, id);
        
    }

    
    
    
    
}




function renderAssignedToRenderArea(){
    
    area = document.getElementById('assignedContactsRenderArea');
    area.innerHTML='';

    for (let i = 0; i < assignedContacts.length; i++){
        area.innerHTML += assignedToRenderAreaHTML(i);
    }

    renderCanvasesInAssignedToRenderArea();

};                    


function assignedToRenderAreaHTML(i){
    return `
        <canvas class="canvasInRenderArea" width="48" height="48" id="R${assignedContacts[i].contactID}"></canvas>
    `;
}

function getOptionRowHTML(i, checkIMG){
    return ` 
    
     <label class="optionRow" for="one" id="label${contactsOfAddPage[i].contactID}" onclick="addToRemoveFromTask('${contactsOfAddPage[i].contactID}')">
         <canvas class="dropdownMenuCanvas" width="48" height="48" id="${contactsOfAddPage[i].contactID}"></canvas>
         <div class="boxNameAndSelect">
             ${contactsOfAddPage[i].name}
             <img src="../img/icons/${checkIMG}" id="four" />
         </div>
     </label>
 
 
 `}
