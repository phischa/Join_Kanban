let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let isDone = [];
let list =[toDo,inProgress,awaitFeedback,isDone];

let dragZoneShow = false;

function init_board() {
    remove_dragzone();
    checkForCard();
    showNoCard();
    loadTasks();
    //createTask(title, description, assignedTo, dueDate, priority, category, subtasks);
}


function remove_dragzone(){
    let dragZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZone.length; i++){
        dragZone[i].classList.remove("class_show");
    }
    dragZoneShow = false;
    showNoCard();
}


function show_dragzone(){
    let dragZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZone.length; i++){
        dragZone[i].classList.add("class_show");
    }
    dragZoneShow = true;
    showNoCard();
}

function checkForCard(){
    for (let i = 0; i < list.length; i++){
        if(list[i].length <= 0){
            list[i].push("no_card")
        }
    }
}

function showNoCard(){
    noCardElement = document.querySelectorAll("[is-No-card]");
    if(dragZoneShow){
        for(let i = 0; i < noCardElement.length; i++){
            noCardElement[i].classList.remove("class_show");
        }
    } else {
        for(let i = 0; i < noCardElement.length; i++){
            noCardElement[i].classList.add("class_show");
        }
    }
}

function startDrag(){
    show_dragzone();
    addEventListener("dragend", (event) => {remove_dragzone();})
}
