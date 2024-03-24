
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
   
    switch(prio){
        case "urgent":
            if(priority=="none"){
                urgentButton.classList.add('urgentButtonPressed');
                priority = "urgent";
            } else if(priority == "urgent"){
                urgentButton.classList.remove('urgentButtonPressed');
                priority = "none";
            } else if (priority!="none"){
                mediumButton.classList.remove('mediumButtonPressed');
                lowButton.classList.remove('lowButtonPressed');
                urgentButton.classList.add('urgentButtonPressed');
                priority = "urgent";
            }
            break;


        case "medium":
            if(priority=="none"){
                mediumButton.classList.add('mediumButtonPressed');
                priority = "medium";
            } else if (priority == "medium") {
                mediumButton.classList.remove('mediumButtonPressed');
                priority = "none";
            }else if (priority!="none"){
                mediumButton.classList.add('mediumButtonPressed');
                lowButton.classList.remove('lowButtonPressed');
                urgentButton.classList.remove('urgentButtonPressed');
                priority = "medium";
            } 
            break;

        case "low":
            if(priority=="none"){
                lowButton.classList.add('lowButtonPressed');
                priority = "low";
            } else if (priority == "low") {
                lowButton.classList.remove('lowButtonPressed');
                priority = "none";
            }else if (priority!="none"){
                mediumButton.classList.remove('mediumButtonPressed');
                lowButton.classList.add('lowButtonPressed');
                urgentButton.classList.remove('urgentButtonPressed');
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