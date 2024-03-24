
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
    document.getElementById('lsubtaskname').value="";
    subtasksOfAddPage = [];
    actualSubtaskOfAddPage = null;

}



function submitTask(){
    console.log("submitTask wird ausgeführt");
    let title = document.getElementById('ltitlename').value;
    let description = document.getElementById('ldescriptionname').value;
    let assigned = assignedToOfAddPage;
    let date = document.getElementById('ldatename').value;
    let priority = priority;
    let category = document.getElementById('lcategoryname').value;
    let subtasks = subtasksOfAddPage;
    
    createTask(title, description, assigned, date, priority, category, subtasks);
    clearForm();
}

function renderSubtaskArea(){
    content = document.getElementById('subtaskRenderArea');
    content.innerHTML = '';
    for (let i = 0; i < subtasksOfAddPage; i++){
        content.innerHTML += subtaskHTML(i);
    }
}


function subtaskHTML(index){
    
    return `
    <div> ${subtasksOfAddPage[index]}  </div>
    
    `;
    
}


// #############################################################################################
                                    //PlayGround

let ThisButtonPressed = "";


function initTask(){
    setwhiteColor();
}

function setwhiteColor(){
    let getBottons = document.querySelectorAll("[buttonButtonbutton]");
    for(let i = 0; i < getBottons.length; i++){
        getBottons[i].classList.add("classRemoveColor");
    }
}

function whichButtonIsPressed(ButtonId){
    let isAlredyPressed = false;
    if(ButtonId == ThisButtonPressed){
        isAlredyPressed = true;
    }
    return isAlredyPressed
}


function setpriority(NumberOfPrio){
    let nextpriority = "urgent";
    if (NumberOfPrio == 2){
        nextpriority = "medium";
    }else if(NumberOfPrio == 3){
        nextpriority = "low";
    }
    return nextpriority;
}


function getPrio(ButtonId,NumberOfPrio){
    let isAlredyPressed = whichButtonIsPressed(ButtonId);
    let currentButton = document.getElementById(ButtonId);
    if(!isAlredyPressed){
        let getBottons = document.querySelectorAll("[buttonButtonbutton]");
        for(let i = 0; i < getBottons.length; i++){
            getBottons[i].classList.add("classRemoveColor");
        }
        currentButton.classList.remove("classRemoveColor");
        ThisButtonPressed = ButtonId;
        priority = setpriority(NumberOfPrio);
    } else {
        currentButton.classList.add("classRemoveColor");
        ThisButtonPressed = "";
        priority = "none"
    }
}


// #############################################################################################


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