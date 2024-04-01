
let priority = "none";

let subtasksOfAddPage= [];
let finalSubtasksOfAddPage=[];

let assignedToOfAddPage=[];

let actualSubtaskOfAddPage;

let contactsOfAddPage=[];
let assignedContacts=[]


let expanded = false;
let inputFeld = document.getElementById('inputfeld');

inputFeld.value="";




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


function addContactsToPage(){
    console.log("contacts zugewiesen");
    
    
    for (let i =0;i< contacts.length; i++){
        contactsOfAddPage.push(contacts[i]);
    }
    
    sortContacts()
}




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
    
  } else {
    checkboxes.style.display = "none";
    searchField.style.display= 'none';
    selectField.style.display="flex";
    expanded = false;
  }
}



function changeSelectArrow() {
   
    
    let select = document.getElementById("lcategoryname");
    let arrowImage;
    
    if(select.classList.contains("opened")){
        arrowImage = "arrow_drop_downaa.svg";
    } else {
        arrowImage = "arrow_drop_up.svg";
    }
       
    
    
    
    
    select.classList.toggle("opened");
  
    select.style.backgroundImage = "url('..//img/icons/" + arrowImage + "')";
}


document.addEventListener("click", function(event) {
    let selectCategory = document.getElementById("lcategoryname");
    let multiSelectContact = document.getElementById("multiSelectContact");

    let checkboxes = document.getElementById("checkboxes");
    let searchField = document.getElementById("searchfield");
    let selectField = document.getElementById("selectfield");

    
    let targetElement = event.target;
    
    //check assignedTO



if(expanded && !multiSelectContact.contains(targetElement)){
    console.log("Klick außerhalb multiselect");
    checkboxes.style.display = "none";
    searchField.style.display= 'none';
    selectField.style.display="flex";
    expanded = false;
}

    
    // Überprüfe, ob das Klicken außerhalb des Select-Tags erfolgt ist
    if (!selectCategory.contains(targetElement)) {
      selectCategory.style.backgroundImage = "url('..//img/icons/arrow_drop_downaa.svg')";
      selectCategory.classList.remove("opened");
    }
  });








async function onload(){
    loadTasks();
    loadUsers();
    await loadContacts();
    addContactsToPage();
   

}

function clearForm(){
    document.getElementById('ltitlename').value = "";
    document.getElementById('ldescriptionname').value = "";
    try{document.getElementById('lassignedname').value="Select contacts to assign";} catch{
        console.error("clearForm muss noch auf das custom Input assigned angepasst werden.");
    } 
    document.getElementById('ldatename').value="";
    uncheckprio();
    document.getElementById('lcategoryname').value="Select task category";
    clearSubtaskInput();
    subtasksOfAddPage = [];
    actualSubtaskOfAddPage = null;

}



function submitTask(){
    console.log("submitTask wird ausgeführt");
    let title = document.getElementById('ltitlename').value;
    let description = document.getElementById('ldescriptionname').value;
    let assigned = assignedToOfAddPage;
    let date = document.getElementById('ldatename').value;
    let prio = priority;
    let category = document.getElementById('lcategoryname').value;
    
    finalizeSubtasks();
    let subtasks = finalSubtasksOfAddPage;
    
    createTask(title, description, assigned, date, prio, category, subtasks);
    clearRenderArea();
    clearForm();
}

function finalizeSubtasks(){
    for(let i = 0; i < subtasksOfAddPage.length; i++){
        finalSubtasksOfAddPage.push(createSubtask(subtasksOfAddPage[i]));
    }
}

function renderSubtaskArea(){
    
    clearRenderArea();
    for (let i = 0; i < subtasksOfAddPage.length; i++){
        
        content.innerHTML += subtaskHTML(i);
    }
}

function clearRenderArea(){
    content = document.getElementById('subtaskRenderAreaList');
    content.innerHTML = '';
}

function subtaskHTML(index){
    
    return `
    <li class="subtaskRenderAreaRow" id="subtaskRenderAreaRow${index}"> 
        
        <div id="subTaskContent${index}">${subtasksOfAddPage[index]}</div>
        <input id="editSubTaskField${index}"class="noDisplay editSubtaskInput">  
        <div>
            <div class="subtaskRenderAreaRowIcons" id="subtaskRenderAreaRowIcons${index}">
                <div id="editSubTaskItem${index}" onclick="clickEditSubTaskItem(${index})" class="editSubTask" > edit  </div>
                <div id="dividerEditSubtask${index}"> | </div>
                <div id="deleteSubTaskItem${index}" onclick="clickDeleteSubTaskItem(${index})" class="deleteSubTask" >trash </div>
        
            
        
        
            </div>
            <div class="subtaskRenderAreaRowIconsForEdit noDisplay" id="subtaskRenderAreaRowIconsForEdit${index}">
                <div id="confirmChange${index}" onclick="confirmChange(${index})"class="confirmChange noDisplay">confirm</div>
                <div id="dividerChanges${index}" class="noDisplay"> | </div>
                <div id="cancelChange${index}" onclick="cancelChange(${index})"class ="cancelChange noDisplay">cancel</div>
    
            </div>
        </div>
    </li>
    
    `;
 
}

function confirmChange(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    subtasksOfAddPage[index]=input.value;
    input.value='';
    input.classList.add('noDisplay');
    document.getElementById(`subTaskContent${index}`).innerHTML= subtasksOfAddPage[index];

    document.getElementById(`subTaskContent${index}`).classList.remove('noDisplay');
    changeEditSubTaskToShowSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.remove('lightBackground');
    
}

function cancelChange(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    input.value='';
    input.classList.add('noDisplay');
    document.getElementById(`subTaskContent${index}`).classList.remove('noDisplay');
    changeEditSubTaskToShowSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.remove('lightBackground');
}


function clickDeleteSubTaskItem(index){

    subtasksOfAddPage.splice(index, 1);
    renderSubtaskArea();
}

function clickEditSubTaskItem(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    //input.disabled=false; 
    
    input.value = subtasksOfAddPage[index];
    input.classList.remove('noDisplay');
    document.getElementById(`subTaskContent${index}`).classList.add('noDisplay');
    
    
    changeShowSubtaskToEditSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.add('lightBackground');

    input.focus();
}

function changeEditSubTaskToShowSubtask(index){
    document.getElementById(`subtaskRenderAreaRowIcons${index}`).classList.remove('noDisplay');
    document.getElementById(`editSubTaskItem${index}`).classList.remove('noDisplay');
    document.getElementById(`deleteSubTaskItem${index}`).classList.remove('noDisplay');
    document.getElementById(`dividerEditSubtask${index}`).classList.remove('noDisplay'); 
    


    document.getElementById(`subtaskRenderAreaRowIconsForEdit${index}`).classList.add('noDisplay');
    document.getElementById(`confirmChange${index}`).classList.add('noDisplay'); 
    document.getElementById(`cancelChange${index}`).classList.add('noDisplay');
    document.getElementById(`dividerChanges${index}`).classList.add('noDisplay');
}


function changeShowSubtaskToEditSubtask(index){
    document.getElementById(`subtaskRenderAreaRowIcons${index}`).classList.add('noDisplay');
    document.getElementById(`editSubTaskItem${index}`).classList.add('noDisplay');
    document.getElementById(`deleteSubTaskItem${index}`).classList.add('noDisplay');
    document.getElementById(`dividerEditSubtask${index}`).classList.add('noDisplay'); 
    


    document.getElementById(`subtaskRenderAreaRowIconsForEdit${index}`).classList.remove('noDisplay');
    document.getElementById(`confirmChange${index}`).classList.remove('noDisplay'); 
    document.getElementById(`cancelChange${index}`).classList.remove('noDisplay');
    document.getElementById(`dividerChanges${index}`).classList.remove('noDisplay');
}




function pressUrgentButton(){
    
    
    if(priority=="none"){
        markUrgent();
        priority = "urgent";
    } else if(priority == "urgent"){
        unmarkUrgent();
        priority = "none";
    } else if (priority!="none"){
        unmarkLow();
        unmarkMedium();
        markUrgent();
        priority = "urgent";
    }
}


function pressMediumButton(){
    
    
    if(priority=="none"){
        markMedium();
        priority = "medium";
    } else if (priority == "medium") {
        unmarkMedium();
        priority = "none";
    }else if (priority!="none"){
        markMedium();
        unmarkLow();
        unmarkUrgent();
        priority = "medium";
    } 
}

function pressLowButton(){
    if(priority=="none"){
        markLow();
         priority = "low";
     } else if (priority == "low") {
         unmarkLow();
         priority = "none";
     }else if (priority!="none"){
         unmarkMedium();
         markLow();
         unmarkUrgent();
         priority = "low";
     }  
}


function markUrgent(){
    document.getElementById('urgentButton').classList.add('urgentButtonPressed');
    document.getElementById('urgentButtonImage').src = "../img/icons/urgent-icon-white.svg";
}

function unmarkUrgent(){
    document.getElementById('urgentButton').classList.remove('urgentButtonPressed');
    document.getElementById('urgentButtonImage').src = "../img/icons/urgent-icon.svg";
}

function markMedium(){
    document.getElementById('mediumButton').classList.add('mediumButtonPressed');
    document.getElementById('mediumButtonImage').src="../img/icons/priority-medium-white.svg";
}

function unmarkMedium(){
    document.getElementById('mediumButton').classList.remove('mediumButtonPressed');
    document.getElementById('mediumButtonImage').src="../img/icons/priority-medium.svg";
}


function markLow(){
    document.getElementById('lowButton').classList.add('lowButtonPressed');
    document.getElementById('lowButtonImage').src="../img/icons/low-icon-white.svg";;
}

function unmarkLow(){
    document.getElementById('lowButton').classList.remove('lowButtonPressed');
    document.getElementById('lowButtonImage').src="../img/icons/low-icon.svg";;
}



function uncheckprio(){
    unmarkLow();
    unmarkMedium();
    unmarkUrgent();
    priority = "none";
}


function pressAddSubtaskButton(){
    changeAddToConfirmOrCancelInSubtask();
    clearSubtaskInput();
    let input= document.getElementById('lsubtaskname');
    input.disabled=false;
    input.focus();
}



function pressConfirmSubtaskButton(){
    if (document.getElementById('lsubtaskname').value!=""){
    subtasksOfAddPage.push(document.getElementById('lsubtaskname').value);
    
    document.getElementById('lsubtaskname').disabled=true;
    
    clearSubtaskInput();
    renderSubtaskArea();
    } else {
        changeConfirmOrCancelToAddInSubtask();
    }
}

function pressCancelSubtaskButton(){
    document.getElementById('lsubtaskname').disabled=true;
    changeConfirmOrCancelToAddInSubtask();
    clearSubtaskInput();
    
    

}

function clearSubtaskInput(){
    document.getElementById('lsubtaskname').value = "";
}

function changeAddToConfirmOrCancelInSubtask(){
    document.getElementById('addButton').classList.add('noDisplay');
    document.getElementById('addButtonIcon').classList.add('noDisplay');
    document.getElementById('CancelAndOkButtonArea').classList.remove('noDisplay');
    document.getElementById('cancelButton').classList.remove('noDisplay');
    document.getElementById('cancelIcon').classList.remove('noDisplay');
    document.getElementById('checkIcon').classList.remove('noDisplay');
    document.getElementById('okButton').classList.remove('noDisplay');
}

function changeConfirmOrCancelToAddInSubtask(){
    document.getElementById('addButton').classList.remove('noDisplay');
    document.getElementById('addButtonIcon').classList.remove('noDisplay');
    document.getElementById('CancelAndOkButtonArea').classList.add('noDisplay');
    document.getElementById('cancelButton').classList.add('noDisplay');
    document.getElementById('cancelIcon').classList.add('noDisplay');
    document.getElementById('okButton').classList.add('noDisplay');
    document.getElementById('checkIcon').classList.add('noDisplay');
}




function renderAssignedToMenu(){

    let menu = document.getElementById('checkboxes');

    menu.innerHTML='';

    for (let i = 0; i < contactsOfAddPage.length; i++){

        let checkIMG;
        if(isAdded(contactsOfAddPage[i].contactID)){
            
            checkIMG ='check-button-mobile-check.svg' ;
       }
       else{
        
        checkIMG = 'check-button-mobile-uncheck.svg';
    } 
        
        menu.innerHTML += getOptionRowHTML(i, checkIMG);
         

    }

renderCanvases();                     

}

function renderCanvases(){
    
    
    
    var canvases = document.getElementsByTagName('canvas');

    for (var i = 0; i < canvases.length; i++) {
        var canvas = canvases[i];
        id = canvas.id;
        let contact =getContactFromID(id);
       
       
        drawColoredCircle(contact.color, contact.initials, id);
        
    }

    
    
    
    
}






function isAdded(Id){
    
    for (let i = 0; i< assignedContacts.length; i++){
        if (assignedContacts[i].contactID == Id){
            
            return true
        }
    }
    return false;



    
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




function renderAssignedToRenderArea(){

    //renderFeld noch bestimmten und als content nehmen
    //canvas html elemente erstellen mit ids der kontakte als id
    renderCanvases();

}


function addToRemoveFromTask(id){
    
    let contact = getAddTaskContactFromID(id);

    if(isAdded(id)){

    } else {
        assignedContacts.push(contact);
    }

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
