let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let isDone = [];
let list =[toDo,inProgress,awaitFeedback,isDone];

myTestTaskObject = [];

async function loadTasks(){
    let loadedTasks = [];
    loadedTasks = await getItem('tasks'); 
    if (loadedTasks.data && loadedTasks.data.value && loadedTasks.data.value!="null"){
        tasks = JSON.parse(loadedTasks.data.value);
        for (let  i = 0; i < tasks.length; i++){
            taskObjects.push(tasks[i]);
        }
    } else {console.warn("RemoteStorage hat keine Tasks gespeichert.")}
}


let taskObjects = [
    {   taskID: "23423412123asdd",
        title:"Kochwelt Page & Recipe Recommender",
        description:"Build start page with recipe. bla",
        assignedTo:"Peter",
        dueDate:"nicht mehr heute",
        priority:"urgent",
        category:"technicalTask",
        currentProgress:1,
        subtasks: [
            { 
                subTaskID: createID(),
                subTaskName: "content",
                done: false
            },
            { 
                subTaskID: createID(),
                subTaskName: "content",
                done: true
            },{ 
                subTaskID: createID(),
                subTaskName: "content",
                done: false
            }]
    },
]


async function init_board() {
    await loadTasks();
    await sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    hideDropZone(0, true);
}


function cleanAllColums(){
    let mobilDragzon = document.querySelectorAll("[drag-zone-mobil]");
    let content = document.querySelectorAll("[is-Column]");
    for(let i = 0; i < content.length; i++){
        content[i].innerHTML = "";
    }
    for(let i = 0; i < mobilDragzon.length; i++){
        mobilDragzon[i].remove();
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
    let text = ["in Todo", "in Progress", "awaits Feedback", "is Done"]
    let columns = document.querySelectorAll("[is-Column]");
    columns[index].innerHTML = `<div is-No-card class="no-card class_show">No Task ${text[index]}</div>`;
}


function emptyAllTasks(){
    toDo = [];
    inProgress = [];
    awaitFeedback = [];
    isDone = [];
}


async function sortLoadetTasks(){
    loadTasks
    emptyAllTasks();
    for (let i = 0; i < await taskObjects.length; i++){
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



async function refreshColumnRender(){
    await sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    hideDropZone(0, true);
}



function returnProgressbar(columnNumber, id){
    let numbTaskDone = checkSubtaskdone(columnNumber, id);
    let numbTotalTask = list[columnNumber][id]["subtasks"].length;
    let value = Math.round(100 / numbTotalTask * numbTaskDone);
    return value
}


function checkSubtaskdone(columnNumber, id){
    let value = 0;
    let object = list[columnNumber][id]["subtasks"];
    for (let i = 0; i < object.length; i++){
        if (object[i]["done"] == true){
            value += 1;
    }
 } return value;
}


function getHTMLCode(categoryColor, text){
    return `<div class="tag ${categoryColor}">${text}</div>`
}


function generateCategory(columnNumber, id){
    let category = list[columnNumber][id]["category"]
    let categoryColor = "grey";
    let text = "No Category"
    let htmlCode = ""
            if (category == "technicalTask"){
                categoryColor = "turquoise"
                text = "Technical Task";
            } else if ((category == "userStory")){
                categoryColor = "blue"
                text = "User Story";
            }
            htmlCode = getHTMLCode(categoryColor, text);
        return htmlCode;
}


function setPriorityImage(columnNumber, id){
    let imageArray = ["../img/icons/urgent-icon.svg", "../img/icons/medium-icon.svg", "../img/icons/low-icon.svg"];
    let priority = list[columnNumber][id]["priority"];
    let value = 1;
    if (priority == "low"){
        value = 2;
    } else if (priority == "urgent"){
        value = 0;
    }
    return imageArray[value] 
}


function generateTeaserText(taskDescription, minLength = 32){
    let splitWord = taskDescription.split(" ");
    let cutedText = "";
    let currentLength = 0
    for (let i = 0; currentLength < minLength; i++){
        currentLength += splitWord[i].length;
        cutedText += splitWord[i] + " ";
    }
    cutedText = cutedText.split(0, -1);
    cutedText += "...";
    return cutedText;
}


function initSearch(){
    let searchValue = document.getElementById("search").value;
    console.log(searchValue);
}


function checkForMinLength(text, minLength = 32){
    let withoutSpace =[];
    let isTextLong = false;
    let splitWord = text.split(" ");
    for(let i = 0; i < splitWord.length; i++){
        withoutSpace.push(splitWord[i]);
    }
    if (withoutSpace.length > minLength){
        isTextLong = true;
    }
    return isTextLong
}


function setText(columnNumber, id){
    let minLength = 36;
    let taskDescription = list[columnNumber][id]["description"];
    let isTextLong = checkForMinLength(taskDescription, minLength);
    if (isTextLong){
        cutedText = generateTeaserText(taskDescription, minLength);
    } else {
        cutedText = taskDescription;
        return cutedText;
    }
    return cutedText;
}


function isSubtask(columnNumber, id){
    Subtasks = list[columnNumber][id]["subtasks"];
    if (Subtasks.length > 0){
        return templateSubTask(columnNumber, id)
    } else{
        return `<hr>`
    }
}



