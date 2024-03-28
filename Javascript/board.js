let dragZoneShow = false;
let currenOnDrag = "";

let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let isDone = [];
let list =[toDo,inProgress,awaitFeedback,isDone];


async function tryloadtask(){
    task = await loadTasks();
    console.log(task)
}


let taskObjects = [
    {   taskID: "23423412123asdd",
        title:"Kochwelt Page & Recipe Recommender",
        description:"Build start page with recipe.",
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
    {   taskID: "23sadasd456123asdd",
        title:"Add Task",
        description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,",
        assignedTo:"Peter",
        dueDate:"vll morgen",
        priority:"low",
        category:"Task-Force-One",
        currentProgress:2,
        subtasks: [{ 
            subTaskID: createID(),
            subTaskName: "content",
            done: true
        },{ 
            subTaskID: createID(),
            subTaskName: "content",
            done: false
        }]
    },
    {   taskID: "23sadasd456123asdd",
        title:"Pizza bestellen",
        description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,",
        assignedTo:"Peter",
        dueDate:"heute Nachmittag",
        priority:"medium",
        category:"technicalTask",
        currentProgress:2,
        subtasks: ["subtaskOne"]
    },
    {   
    taskID: "2sadasderw",
    title:"Die Kartoffeln schälen",
    description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,",
    assignedTo:"Peter",
    dueDate:"heute Nachmittag",
    priority:"urgent",
    category:"userStory",
    currentProgress:0,
    subtasks: [{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: true
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: true
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: false
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: false
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: true
    }]
},
{   taskID: "2sadasderw",
    title:"Meh wo bin ich hier",
    description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,",
    assignedTo:"Peter",
    dueDate:"heute Nachmittag",
    priority:"low",
    category:"userStory",
    currentProgress:1,
    subtasks: [{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: false
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: false
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: false
    },{ 
        subTaskID: createID(),
        subTaskName: "content",
        done: true
    }]
}
]


function init_board() {
    pullTask();
    tryloadtask();
    // Task müssen von Server geladen werden, bevor Sie sotiert werden können.
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    loadTasks();
    initDropZone();
    hideDropZone(0, true);
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
            inProgress.unshift(taskObjects[i]);
        } else if(taskObjects[i]["currentProgress"] == 2){
            awaitFeedback.unshift(taskObjects[i]);
        }else if(taskObjects[i]["currentProgress"] == 3){
            isDone.unshift(taskObjects[i]);
        } else{
            toDo.unshift(taskObjects[i]);
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
    let columnsName = [0,1,2,3]
    hideNoCard();
    for(let i = 0 ; i < columns.length; i++){
        columns[i].innerHTML += `<div drag-zone class="show_dragzone class_show" ondrop="moveTo(${columnsName[i]})" ondragover="allowDrop(event)"></div>`
    }
}

function allowDrop(ev) {
    ev.preventDefault();
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


function hideDropZone(columnId, atAll){
    let dragZoneElement = document.querySelectorAll("[drag-zone]");
        for (let i = 0; i < dragZoneElement.length; i++){
            if(columnId != i || atAll){
            dragZoneElement[i].classList.remove("class_show");
            }
        }
        showNoCard();
}


function showDropZone(columnId, atAll){
    let dragZoneElement = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZoneElement.length; i++){
        if(columnId != i || atAll){
        dragZoneElement[i].classList.add("class_show");
        }  
    }
     hideNoCard();
}


function deletDropZone(){
    let dropZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dropZone.length; i++){
        dropZone[i].remove();
    }
}


function startDragFrom(columnId, id, atAllboolean){
    showDropZone(columnId, atAllboolean);
    currenOnDrag = [columnId, id]
}


function refreshColumnRender(){
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    hideDropZone(0, true);
}


function moveTo(category){
    list[currenOnDrag[0]][currenOnDrag[1]]["currentProgress"] = category;
    refreshColumnRender();
}


function endDrag(columnId, atAllboolean){
   hideDropZone(columnId, atAllboolean);
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


// #################    for several Category    ####################
/*


function getHTMLCode(categoryColor, columnNumber, id, i){
    return `<div class="tag ${categoryColor}">${list[columnNumber][id]["category"][i]}</div>`
}


function generateCategory(columnNumber, id){
let category = list[columnNumber][id]["category"]
let categoryColor = "grey";
let htmlCode = ""
    for (let i = 0; i < category.length; i++){
        if (category[i] == "technicalTask"){
            categoryColor = "turquoise"
        } else if ((category[i] == "userStory")){
            categoryColor = "blue"
        }
        currentCode = getHTMLCode(categoryColor, columnNumber, id, i);
        htmlCode += currentCode;
    }
    return htmlCode;
}
*/


function getHTMLCode(categoryColor, columnNumber, id, text){
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
            htmlCode = getHTMLCode(categoryColor, columnNumber, id, text);
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

function generateTeaserText(taskDescription){
    let splitWord = taskDescription.split(" ");
    let cutedText = "";
    let currentLength = 0
    for (let i = 0; currentLength < 32; i++){
        currentLength += splitWord[i].length;
        cutedText += splitWord[i] + " ";
    }
    cutedText = cutedText.split(0, -1);
    cutedText += "...";
    return cutedText;
}


function setText(columnNumber, id){
    let taskDescription = list[columnNumber][id]["description"];
    let splitWord = taskDescription.split(" ");
    console.log(splitWord.length)
    if (splitWord.length > 5){
        cutedText = generateTeaserText(taskDescription);
    } else {
        cutedText = taskDescription;
        return cutedText;
    }
    return cutedText;
}


function templateCard(columnNumber, id){
    return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
    <div class="card">
    <div class="category">${generateCategory(columnNumber, id)}</div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${setText(columnNumber, id)}</div>
    <div class="subtask-bar">    
      <div class="bar">
        <div class="progress-bar" style="width:${returnProgressbar(columnNumber, id)}%;"></div>
      </div>
      ${checkSubtaskdone(columnNumber, id)}/${list[columnNumber][id]["subtasks"].length} Subtasks
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
        <img src="${setPriorityImage(columnNumber, id)}">
      </div>
    </div>
</div>
</div>`;
}
