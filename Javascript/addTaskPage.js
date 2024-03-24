
let prio;

let subtasksOfAddPage= [];

let assignedToOfAddPage=[];

let actualSubtaskOfAddPage;


function clearForm(){
    document.getElementById('ltitlename').value = "";
    document.getElementById('ldescriptionname').value = "";
    document.getElementById('lassignedname').value="Select contacts to assign";
    document.getElementById('ldatename').value="";
    //prio zurücksetzen fehlt noch
    
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
    let priority = prio;
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