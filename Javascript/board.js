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
    {   taskID: "23sadasd456123asdd",
        title:"Add Task",
        description:"Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne",
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


function templateSubTask(columnNumber, id){
return ` 
    <div class="subtask-bar">    
        <div class="bar">
         <div class="progress-bar" style="width:${returnProgressbar(columnNumber, id)}%;"></div>
        </div>
            ${checkSubtaskdone(columnNumber, id)}/${list[columnNumber][id]["subtasks"].length} Subtasks
        </div>
    `
}


function templateCard(columnNumber, id){
    return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" onclick="show_BlackBox()" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
    <div isCard card-in-column="${columnNumber}" class="card">
    <div class="category">${generateCategory(columnNumber, id)}</div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${setText(columnNumber, id)}</div>

      ${isSubtask(columnNumber, id)}
     
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
