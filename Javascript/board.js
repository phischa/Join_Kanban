let toDo = [];
let inProgress = [];
let awaitFeedback = [];
let isDone = [];
let taskObjects = []
let list =[toDo,inProgress,awaitFeedback,isDone];
let urlVariable = checkUrlFeature()
let isInEdit = false;


async function saveCurrentTask(columnId = 0, id = 0, orWithID = false){
    let pullTask = "";
    if(!orWithID){
        pullTask = list[columnId][id]["taskID"];
    } else{
        pullTask = orWithID;
    }
    setAsActualTask(pullTask);
    actualizeSubtasks(columnId, id);
    editActucalTask(columnId, id);
    await saveActualTask();
    await storeTasks();
}


function deleteTaskFromtaskObjects(columnId,id){
    let pulledID = list[columnId][id]["taskID"];
    for(let i = 0; i < taskObjects.length;i++){
        if(pulledID == taskObjects[i]["taskID"]){
            taskObjects.splice(i,1);
        }
    }
}


function deleteCurrentTask(columnId,id){
    let pulledTask = list[columnId][id]["taskID"];
    deleteTask(pulledTask);
    storeTasks();
    deleteTaskFromtaskObjects(columnId,id);
    refreshColumnRender();
    hideBlackbox();
} 



async function baordLoadTasks(){
    taskObjects = [];
    let loadedTasks = [];
    loadedTasks = await getItem('tasks'); 
    if (loadedTasks.data && loadedTasks.data.value && loadedTasks.data.value!="null"){
        tasks = JSON.parse(loadedTasks.data.value);
        for (let  i = 0; i < tasks.length; i++){
            taskObjects.push(tasks[i]); 
        }
    } else {console.warn("RemoteStorage hat keine Tasks gespeichert.")}
}


async function initBoard() {
    await baordLoadTasks();
    await loadActualUser();
    await initialsOf();
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    hideDropZone(0, true);
    checkUrlFeature();
}


function checkUrlFeature(){
    let arrayUrl = new URLSearchParams(window.location.search);
    let value = arrayUrl.get("findtaskbyid");
    if(value){
        search(value);
    } else {
        value = false
    }
    return value;
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


function initRenderCard(columnId,id){
    let columns = document.querySelectorAll("[is-Column]");
    columns[columnId].innerHTML += templateCard(columnId,id);
}


function refreshColumnRender(){
    sortLoadetTasks();
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
    return value;
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


/*   
    ####################################################
    ##########  Function to render Category   ########## 
    ####################################################   
                                                            */
function generateCategory(columnNumber, id){
    let category = list[columnNumber][id]["category"]
    let values = checkCategoryType(category);
    return `<div class="tag ${values[0]}">${values[1]}</div>`
}


function checkCategoryType(category){
    let categoryColor = "grey";
    let text = "No Category";
    let array = [];
    switch(category){
        case "technicalTask": categoryColor = "turquoise", text = "Technical Task";break;
        case "userStory": categoryColor = "blue", text = "User Story";break;
        case "bug": categoryColor = "raspberry", text = "Bug";break;
        case "feature": categoryColor = "yellow", text = "Feature";break;
        case "refactor": categoryColor = "peach", text = "Refactor";break;
        case "documentation": categoryColor = "pruple", text = "Dokumentationy";break;
        case "Testing": categoryColor = "green", text = "Testing QA";break;
        case "Analysis": categoryColor = "darkCyan", text = "Analysis/Research";break;
        case "Design": categoryColor = "rose", text = "Design";break;
        default: color = categoryColor = "grey", text = "No Category";
    }
    array = [categoryColor, text]
    return array
}


function setPriorityImage(columnNumber, id){
    let imageArray = ["../img/icons/empty-icon.svg", "../img/icons/urgent-icon.svg", "../img/icons/medium-icon.svg", "../img/icons/low-icon.svg"];
    let priority = list[columnNumber][id]["priority"];
    let value = 0;
    if (priority == "low"){
        value = 3;
    } else if (priority == "urgent"){
        value = 1;
    }
    else if (priority == "medium"){
        value = 2;
    }
    return imageArray[value] 
}


/*   
    ####################################################
    ##########  Function for Search a Task   ########### 
    ####################################################   
                                                            */


function initSearch(clickedButton = false){
    delerror();
    parentId = document.getElementById("search").parentElement;  ;
    let searchValue = document.getElementById("search").value;
    if (searchValue.length >= 3){
        search(searchValue);
    } else if (searchValue.length <= 3 && clickedButton){
            seterror(parentId, "Min. 3 or more characters are necessary.");
    } else if(searchValue.length <= 3 && !clickedButton){
        search("", 0);
    }
}


function search(searchValue, modus = 0){
    let keySoup = result = ""
    for (let i = 0; i < list.length; i++){
        if(list[i].length > 0){
            for(let x = 0; x < list[i].length; x++){
                keySoup = keysfromCardForSearch(i, x);
                ProcessWithTask(i, x, false,  0)
                if(keySoup.includes(searchValue.toLowerCase()) || list[i][x]["taskID"] == searchValue){
                    result = ProcessWithTask(i, x, true, modus)
                    console.log(result);
                    return result;
                }
            }
        }
    }
}


function keysfromCardForSearch(columnNumber, id){
    let keySoup = "";
    keySoup += list[columnNumber][id]["title"].toLowerCase();
    keySoup += " " + list[columnNumber][id]["description"].toLowerCase();
    return keySoup;
}


function ProcessWithTask(columnId, id, wasfound = false, modus = 0){
    if (!modus && !wasfound){
        toogleTransparents(columnId, id, true);
    } else if(!modus && wasfound){
        toogleTransparents(columnId, id, false);
    } else if(modus = 1 && wasfound){
        return [columnId, id];
    }
}


function toogleTransparents(columnNumber, id, setAllOn){
    element = document.getElementById(`ColumnNumb-${columnNumber}_Id-${id}`);
    if(!setAllOn){
        element.classList.remove("addTransparent");
    } else{
        element.classList.add("addTransparent");
    }
}


/*   
    ####################################################
    ##########  Function to Cut/Edit Text   ############ 
    ####################################################   
                                                            */
function generateTeaserText(taskDescription, maxLength = 32){
    let splitWord = taskDescription.split(" ");
    let cutedText = "";
    for (let i = 0; cutedText.length < maxLength; i++){
        cutedText += splitWord[i] + " ";
    }
    cutedText = cutedText.split(0, -1);
    cutedText += "...";
    return cutedText;
}


function checkForMaxLength(text, maxLength = 32){
    let withoutSpace = "";
    let isTextLong = false;
    let splitWord = text.split(" ");
    for(let i = 0; i < splitWord.length; i++){
        withoutSpace += splitWord[i];
    }
    if (withoutSpace.length > maxLength){
        isTextLong = true;
    }
    return isTextLong
}


function setText(columnNumber = 0, id = 0, ortext = "", maxLength = 36){
    let taskDescription = receivedTaskOrText(ortext, columnNumber, id);
    let isTextLong = checkForMaxLength(taskDescription, maxLength);
    let cutedText = "";
    if (isTextLong){
        cutedText = generateTeaserText(taskDescription, maxLength);
    } else {
        cutedText = taskDescription;
        return cutedText;
    }
    return cutedText;
}


function receivedTaskOrText(text, columnNumber, id){
    let inputText = "";
    if(text.length > 0){
        inputText = text;
    } else{
        inputText = list[columnNumber][id]["description"];
    }
    return inputText;
}


function isSubtask(columnNumber, id){
    let subtasks = list[columnNumber][id]["subtasks"];
    if (subtasks.length > 0){
        return templateSubTask(columnNumber, id)
    } else{
        return `<hr>`
    }
}


function setDateFormat(columnNumber, id){
    let currentDate = list[columnNumber][id]["dueDate"].split("-");
    let newDateFormat = currentDate[2] + "/" + currentDate[1] + "/" + currentDate[0]
    return newDateFormat
}


function toTitleWord(string){
    let newString = null;
    if(string){
    let firstLetter = string[0];
    firstLetter = firstLetter.toUpperCase();
    string = string.substr(1).toLowerCase();
    newString = firstLetter + string;
    } else{
        newString = "Aktuell keine Prio"
    }
    return newString
}


function setPriorityName(columnNumber, id){
    let currentPriority = list[columnNumber][id]["priority"];
    currentPriority = toTitleWord(currentPriority);
    return currentPriority
}


function openLightboxCard(columnNumber, id){
    let content = document.getElementById("cardLightboxContent");
    content.innerHTML = templateLightboxCards(columnNumber, id);
}


function setSubtaskImage(columnNumber, id, i){
    let imagePath = "../img/icons/check-button-mobile-uncheck.svg";
    isTaskDone = list[columnNumber][id]["subtasks"][i]["done"];
    if (isTaskDone){
        imagePath = "../img/icons/check-button-mobile-check.svg";
    }
    return imagePath;
}


function resetLightboxAndCard(columnNumber, id, elementId){
    let lightbox = document.getElementById("cardLightboxContent");
    let card = document.getElementById(`ColumnNumb-${columnNumber}_Id-${id}`);
    if(elementId){
        lightbox = document.getElementById(elementId);
        lightbox.innerHTML = generateListOfSubtask(columnNumber, id)
    } else {
        lightbox.innerHTML = templateLightboxCards(columnNumber, id);
    }
    card.innerHTML = templateRefreshCard(columnNumber, id);
}


function changeStatusSubtask(columnNumber, id, subtaskId){
    let substaskStatus = list[columnNumber][id]["subtasks"][subtaskId]["done"];
    if (substaskStatus){
        list[columnNumber][id]["subtasks"][subtaskId]["done"] = false;
    } else{
        list[columnNumber][id]["subtasks"][subtaskId]["done"] = true;
    }
    resetLightboxAndCard(columnNumber, id, "cardLightboxSubtask");
    saveCurrentTask(columnNumber, id);
}


function generateListOfSubtask(columnNumber, id){
    let currentHTMLCode = "";
    let HTMLCode = "";
    for (let i = 0;  i < list[columnNumber][id]["subtasks"].length;i++){
        currentHTMLCode = `<li onclick="changeStatusSubtask(${columnNumber}, ${id}, ${i})"><img src="${setSubtaskImage(columnNumber, id, i)}"><p>${setText(false, false, ortext = list[columnNumber][id]["subtasks"][i]["subTaskName"], maxLength = 245)}</p></li>`;
        HTMLCode += currentHTMLCode;
    }
    if(list[columnNumber][id]["subtasks"].length <=0){
        HTMLCode = `<div>Keine Subtasks vorhanden!</div>`
    }
    return HTMLCode;
}


function generateAssignedTo(columnNumber, id, isForCard, maxCounter = 5){
    let assignedTo = list[columnNumber][id]["assignedTo"];
    let currentHTMLCode = "";
    let HTMLCode = "";
    for (let i = 0;  i < assignedTo.length;i++){
            if(i < maxCounter && isForCard){
                currentHTMLCode = `<div style="background-color: ${assignedTo[i]["color"]}" class="avatar">${assignedTo[i]["initials"]}</div>`;
            } else if (i >= maxCounter && isForCard){
                currentHTMLCode = `<div class="assignToNumber"><div class="numberOfAssignTo">+${list[columnNumber][id]["assignedTo"].length - maxCounter}</div></div>`;
                HTMLCode += currentHTMLCode;
                break;
            } else if(!isForCard){
                currentHTMLCode = `<li><div style="background-color: ${assignedTo[i]["color"]}" class="circle">${assignedTo[i]["initials"]}</div><p>${assignedTo[i]["name"]}</p></li>`;
            }
            HTMLCode += currentHTMLCode;
        }
    return HTMLCode;
}
