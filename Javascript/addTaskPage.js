
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


function pressUrgentButton(){
    
    
    checkPrio("urgent");
}


function pressMediumButton(){
    
    
    checkPrio("medium");
}

function pressLowButton(){
   checkPrio("low"); 
}

function checkPrio(prio){
    let urgentButton = document.getElementById('urgentButton');
    let mediumButton = document.getElementById('mediumButton');
    let lowButton = document.getElementById('lowButton');
    let urgentImage = document.getElementById('urgentButtonImage');
    let mediumImage = document.getElementById('mediumButtonImage');
    let lowImage = document.getElementById('lowButtonImage');

   
    switch(prio){
        case "urgent":
            if(priority=="none"){
                urgentButton.classList.add('urgentButtonPressed');
                urgentImage.src = "../img/icons/urgent-icon-white.svg";

                priority = "urgent";
            } else if(priority == "urgent"){
                urgentButton.classList.remove('urgentButtonPressed');
                urgentImage.src = "../img/icons/urgent-icon.svg";
                priority = "none";
            } else if (priority!="none"){
                mediumButton.classList.remove('mediumButtonPressed');
                mediumImage.src = "../img/icons/priority-medium.svg";
                lowButton.classList.remove('lowButtonPressed');
                lowImage.src= "../img/icons/low-icon.svg";
                urgentButton.classList.add('urgentButtonPressed');
                urgentImage.src = "../img/icons/urgent-icon-white.svg";

                priority = "urgent";
            }
            break;


        case "medium":
            if(priority=="none"){
                mediumButton.classList.add('mediumButtonPressed');
                mediumImage.src="../img/icons/priority-medium-white.svg";
                priority = "medium";
            } else if (priority == "medium") {
                mediumButton.classList.remove('mediumButtonPressed');
                mediumImage.src="../img/icons/priority-medium.svg"
                priority = "none";
            }else if (priority!="none"){
                mediumButton.classList.add('mediumButtonPressed');
                mediumImage.src="../img/icons/priority-medium-white.svg";
                lowButton.classList.remove('lowButtonPressed');
                lowImage.src= "../img/icons/low-icon.svg";
                urgentButton.classList.remove('urgentButtonPressed');
                urgentImage.src = "../img/icons/urgent-icon.svg";
                priority = "medium";
            } 
            break;

        case "low":
            if(priority=="none"){
                lowButton.classList.add('lowButtonPressed');
                lowButtonImage.src="../img/icons/low-icon-white.svg";
                priority = "low";
            } else if (priority == "low") {
                lowButton.classList.remove('lowButtonPressed');
                lowButtonImage.src="../img/icons/low-icon.svg";
                priority = "none";
            }else if (priority!="none"){
                mediumButton.classList.remove('mediumButtonPressed');
                mediumImage.src="../img/icons/priority-medium.svg"
                lowButton.classList.add('lowButtonPressed');
                lowButtonImage.src="../img/icons/low-icon-white.svg";
                urgentButton.classList.remove('urgentButtonPressed');
                urgentImage.src = "../img/icons/urgent-icon.svg";
                priority = "low";
            } 
            break;
    }


}

function uncheckprio(){
    let urgentButton = document.getElementById('urgentButton');
    let mediumButton = document.getElementById('mediumButton');
    let lowButton = document.getElementById('lowButton');
    urgentButton.classList.remove('urgentButtonPressed');
    mediumButton.classList.remove('mediumButtonPressed');
    lowButton.classList.remove('lowButtonPressed');
    priority = "none";
}