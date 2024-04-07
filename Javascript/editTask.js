let setNewPriority = null;
let phantomTaskObject = {};


function saveNewSubtask(newTask, elementId, idOfInput){
    delerror();
    let parentElement = document.getElementById(`selectAddInput_1`);
    let SubtaskList = document.getElementById(`cardLightboxSubtask`);
    if(newTask.length > 0 && newTask != null){
        SubtaskList.innerHTML += `<li>${newTask}</li>`
    } else{
        seterror(parentElement, "Ups. This Field is required.");
    }
}


function seterror(elementId, text){
    let textNode = document.createTextNode(`${text}`);
    let newNode = document.createElement("div");
    newNode.appendChild(textNode);
    newNode.setAttribute("class", "errorIsOn");
    newNode.setAttribute("error", "");
    elementId.setAttribute("data-error", "");
    elementId.classList.add("errorBoarder");
    elementId.insertAdjacentElement('afterend', newNode);
}

function delerror(){
    let allErrors = document.querySelectorAll("[error]");
    let allBorder = document.querySelectorAll("[data-error]");
    for(let i = 0; i < allErrors.length; i++){
        allErrors[i].remove();
    }
    for(let i = 0; i < allBorder.length; i++){
        allBorder[i].classList.remove("errorBoarder");
    }
}


function openEditableMode(columnNumber, id){
    let content = document.getElementById(`cardLightboxContent`)
    content.innerHTML = templateLightboxEditTask(columnNumber, id)
    setNewPriority = null;
    checkCurrentPrio(columnNumber, id);
}


function checkCurrentPrio(columnNumber, id){
    let currentValue = list[columnNumber][id]["priority"];
    let newValue = null;
    if(currentValue == "medium"){
        newValue = 1;
    } else if(currentValue == "low"){
        newValue = 2;
    } else if(currentValue == "urgent"){
        newValue = 0;
    }
    setOfValuePrio(newValue);
 }


function setOfValuePrio(value){
    let allElements = document.querySelectorAll("[priorityButton]");
    for(let i = 0; i < allElements.length; i++){
            allElements[i].classList.add("clearColor", "buttonhover");
        if(value == i){
            if(value != setNewPriority){
                allElements[i].classList.remove("clearColor", "buttonhover");
                setNewPriority = value;
            } else{
                allElements[i].classList.add("clearColor", "buttonhover");
                setNewPriority = null;
            }
        }
    }
}

function checkAndSave(columnNumber, id){
    delerror();
    let isRequired = checkRequiredInputs();
    //createObjectTask();
    //mergeObjectToTask(columnNumber, id);
    if(isRequired){
        openLightboxCard(columnNumber, id);
    }
}

function checkForError(ArrayWithElements, ErrorText){
    let ischeked = true
    let errorCounter = 0
    for(let i = 0; i < ArrayWithElements.length; i++){
        let value = ArrayWithElements[i].value;
        if(value.length <= 0){
            let parentElement = ArrayWithElements[i]
            seterror(parentElement, ErrorText);
            errorCounter += 1
        }
    }
    if(errorCounter > 0){
        ischeked = false 
    }
    return ischeked;
}


function checkRequiredInputs(){
    let title = document.getElementById("lightboxEditTitle");
    let date = document.getElementById("ldatename");
    let elementArray = [title, date]
    let ischeked = checkForError(elementArray, "Ups. This Field is required.");
    return ischeked
}