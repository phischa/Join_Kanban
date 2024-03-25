
let priority = "none";

let subtasksOfAddPage= [];

let assignedToOfAddPage=[];

let actualSubtaskOfAddPage;


function clearForm(){
    document.getElementById('ltitlename').value = "";
    document.getElementById('ldescriptionname').value = "";
    document.getElementById('lassignedname').value="Select contacts to assign";
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
    let subtasks = subtasksOfAddPage;
    
    createTask(title, description, assigned, date, prio, category, subtasks);
    clearForm();
}

function renderSubtaskArea(){
    
    content = document.getElementById('subtaskRenderArea');
    content.innerHTML = '';
    for (let i = 0; i < subtasksOfAddPage.length; i++){
        
        content.innerHTML += subtaskHTML(i);
    }
}


function subtaskHTML(index){
    
    return `
    <div class="subtaskRenderAreaRow"> 
        <input id="editSubTaskField${index}"class="noDisplay editSubtaskInput">
        <div id="subTaskContent${index}">${subtasksOfAddPage[index]}</div>  
    
        <div class="subtaskRenderAreaRowIcons">
            <div id="editSubTaskItem${index}" onclick="clickEditSubTaskItem(${index})" class="editSubTask" > edit  </div>
            <div> | </div>
            <div id="deleteSubTaskItem${index}" onclick="clickDeleteSubTaskItem(${index})" class="deleteSubTask" >trash </div>
        </div>
        <div class="subtaskRenderAreaRowIconsForEdit noDisplay" id=subtaskRenderAreaRowIconsForEdit${index}>
            <div id="confirmChange${index}" class="confirmChange noDisplay">confirmChange </div>
            <div> | </div>
            <div id="cancelChange${index}"class ="cancelChange noDisplay"> cancelChange </div>
        </div>
    </div>
    
    `;
    
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
    
    input.focus();
}


function changeShowSubtaskToEditSubtask(index){

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
   
    subtasksOfAddPage.push(document.getElementById('lsubtaskname').value);
    console.log(subtasksOfAddPage);
    document.getElementById('lsubtaskname').disabled=true;
    changeConfirmOrCancelToAddInSubtask();
    clearSubtaskInput();
    renderSubtaskArea();
}

function pressCancelSubtaskButton(){
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