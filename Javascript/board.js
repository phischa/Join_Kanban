let dragZoneShow = false;

let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let isDone = [];
let list =[toDo,inProgress,awaitFeedback,isDone];


let taskObjects = [
    {   taskID: "23423412123asdd",
        title:"Playground",
        description:"muss gebaut werden",
        assignedTo:"Peter",
        dueDate:"nicht mehr heute",
        priority:"hight",
        category:"Task-Force-One",
        currentProgress:0,
        subtasks: ["subtaskOne","SubtaskTwo"]
    },
    {   taskID: "23sadasd456123asdd",
        title:"Add Task",
        description:"Ich weiß doch auch nicht weiter",
        assignedTo:"Peter",
        dueDate:"vll morgen",
        priority:"low",
        category:"Task-Force-One",
        currentProgress:3,
        subtasks: ["subtaskOne","SubtaskTwo"]
    },
    {   taskID: "23sadasd456123asdd",
        title:"Pizza bestellen",
        description:"Ich habe kein Geld",
        assignedTo:"Peter",
        dueDate:"heute Nachmittag",
        priority:"medium",
        category:"Task-Force-One",
        currentProgress:2,
        subtasks: ["subtaskOne","SubtaskTwo"]
    }
]


function init_board() {
    pullTask();
    // Task müssen von Server geladen werden, bevor Sie sotiert werden können.
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    loadTasks();
    initDropZone();
    hideDropZone();
}


function startRender(){
    pullTask();
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    
}


function pullTask(){
    toDo = [];
    inProgress = [];
    awaitFeedback = [];
    isDone = [];
    for (let i = 0; i < task.length; i++)
        console.log(task[i]["currentProgress"])
}


function show_dragzone(){
    let dragZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZone.length; i++){
        dragZone[i].classList.add("class_show");
    }
    dragZoneShow = true;
    showNoCard();
}


function cleanAllColums(){
    let content = document.querySelectorAll("[is-Column]");
    for(let i = 0; i < content.length; i++){
        content[i].innerHTML = "";
    }
}


function checkForCard(){
    for(let i = 0; i < list.length; i++){
        if(list[i].length > 0){
            for (let e = 0; e < list[i].length; e++){
                initRenderCard(i,e);
            }
        } else{
            renderNoCard(i);
        }
    }
}


function renderNoCard(index){
    let columns = document.querySelectorAll("[is-Column]");
    columns[index].innerHTML = `<div is-No-card class="no-card class_show">No Task here</div>`;
}


function emptyAllTasks(){
    toDo = [];
    inProgress = [];
    awaitFeedback = [];
    isDone = [];
}


function sortLoadetTasks(){
    emptyAllTasks();
    for (let i = 0; i < taskObjects.length; i++){
        if(taskObjects[i]["currentProgress"] == 1){
            inProgress.push(taskObjects[i]);
        } else if(taskObjects[i]["currentProgress"] == 2){
            awaitFeedback.push(taskObjects[i]);
        }else if(taskObjects[i]["currentProgress"] == 3){
            isDone.push(taskObjects[i]);
        } else{
            toDo.push(taskObjects[i]);
        }
    }
    list =[toDo,inProgress,awaitFeedback,isDone];
}


function initRenderCard(ColumnId,TaskId){
    let columns = document.querySelectorAll("[is-Column]");
    columns[ColumnId].innerHTML += templateCard(ColumnId,TaskId);
}


function initDropZone(){
    let columns = document.querySelectorAll("[is-Column]");
    hideNoCard();
    for(let i = 0 ; i < columns.length; i++){
        columns[i].innerHTML += `<div drag-zone class="show_dragzone class_show"></div>`
    }
}


function showNoCard(){
    let noCardElement = document.querySelectorAll("[is-No-card]");
    for (let i = 0; i < noCardElement.length; i++){
        noCardElement[i].classList.add("class_show");
    }
}


function hideNoCard(){
    let noCardElement = document.querySelectorAll("[is-No-card]");
    for (let i = 0; i < noCardElement.length; i++){
        noCardElement[i].classList.remove("class_show");
    }
}


function hideDropZone(){
    let dragZoneElement = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZoneElement.length; i++){
        dragZoneElement[i].classList.remove("class_show");
    }
    showNoCard();
}


function showDropZone(){
    let dragZoneElement = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZoneElement.length; i++){
        dragZoneElement[i].classList.add("class_show");
    }
    hideNoCard();
}


function deletDropZone(){
    let dropZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dropZone.length; i++){
        dropZone[i].remove();
    }
}


function startDrag(){
    addEventListener("dragstart",  (event) => {showDropZone();})
    addEventListener("dragend", (event) => {hideDropZone();})
}


function templateCard(columnNumber, id){
    return `<div id="${'id'}">
    <div class="card" draggable="true" ondragstart="startDrag()">
    <div class="category"><div class="tag blue">User Story</div><div class="tag yellow">Up-Side_Down</div><div class="tag turquoise">Beat-Saber</div></div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${list[columnNumber][id]["description"]}</div>
    <div class="subtask-bar">    
      <div class="bar">
        <div class="progress-bar" style="width:66%;"></div>
      </div>
      200/${taskObjects[id]["subtasks"].length} Subtasks
    </div>
    <div class="footer-of-card">
      <div class="submit-user-area">
          <div class="avatar orange">OR</div>
          <div class="avatar pruple">NP</div>
          <div class="avatar yellow">YE</div>
          <div class="avatar pink">PI</div>
          <div class="avatar green">GR</div>
          <div class="avatar turquoise">TU</div>
          <div class="avatar red">HF</div>
      </div>
      <div class="priority">
        <img src="../img/icons/priority-medium.svg">
      </div>
    </div>
</div>
</div>`;
}
