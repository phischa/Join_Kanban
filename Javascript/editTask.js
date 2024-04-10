let setNewPriority = null;
let boardContacts = []
let phantomTaskObject = {
    assignedTo:[],
    category: "string",
    currentProgress: "number",
    subtasks:[],
};


async function loadBoardContacts(){
    let loadedBoardContacts = [];
    loadedBoardContacts = await getItem('contacts');
    if (loadedBoardContacts.data && loadedBoardContacts.data.value && loadedBoardContacts.data.value!="null"){
        boardContacts = JSON.parse(loadedBoardContacts.data.value);
    } else {console.warn("RemoteStorage hat keine Kontakte gespeichert.")} 
    console.log(boardContacts);
}


function loadTaskToPhantomTask(columnNumber, id){
    phantomTaskObject = list[columnNumber][id];
}


function saveChagesToTask(columnNumber, id){
    list[columnNumber][id] = phantomTaskObject;
    saveCurrentTask(columnNumber,id, false);
}


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


async function openEditableMode(columnNumber, id){
    let content = document.getElementById(`cardLightboxContent`)
    content.innerHTML = templateLightboxEditTask(columnNumber, id)
    setNewPriority = null;
    await loadBoardContacts();
    loadTaskToPhantomTask(columnNumber, id)
    checkCurrentPrio(columnNumber, id);
    rendersubtask(columnNumber, id);
    renderProfilsInAssignToEdit();
}


function checkCurrentPrio(){
    let currentValue = phantomTaskObject["priority"];
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
    if(isRequired){
        setChagesToPhantomTask();
        saveChagesToTask(columnNumber, id);
        refreshColumnRender();
        openLightboxCard(columnNumber, id);
    }
}


function setChagesToPhantomTask(){
    phantomTaskObject["title"] = document.getElementById("lightboxEditTitle").value;
    phantomTaskObject["description"] = document.getElementById("lightboxEditText").value;
    phantomTaskObject["dueDate"] = document.getElementById("ldatename").value;
    phantomTaskObject["priority"] = setNewestPriority();
}


function setNewestPriority(){
    let options = ["urgent","medium","low"];
    let currentOption = null;
    if (setNewPriority != null){
        currentOption = options[setNewPriority];
    }
    return currentOption;
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


function renderProfilsInAssignToEdit(){
    let content = document.getElementById("selectArea_1");
    let contactId = "";
    content.innerHTML = "";
    for (let i = 0; i < boardContacts.length; i++){
        contactId = boardContacts[i]["contactID"];
        content.innerHTML += templateProfilForAssignTo(i, contactId);
    }
}


function rendersubtask(){
    let content = document.getElementById("cardLightboxEditSubtask");
    content.innerHTML = "";
    let subtask = "";
    let subtasks = phantomTaskObject["subtasks"]
    if (subtasks.length > 0){
        for (let i = 0; i < subtasks.length; i++){
            subtask = phantomTaskObject["subtasks"][i]["subTaskName"];
            content.innerHTML += templateSubtaskEdit(subtask);
        }
    } else{
        content.innerHTML = `<li class="stopHover">Keine Subtasks vorhanden!</li>`;
    }
}


function addNewSubTask(id){
    let isSaved = true;
    let inputElement = document.getElementById(`selectAddInputField_${id}`);
    let parentElement = document.getElementById(`selectAddInput_${id}`);
    if (inputElement.value.length <= 0){
        seterror(parentElement, "Ups. This Field is required.");
        isSaved = false;
    } else { 
        let subtask = { done: false,
                        subTaskID: createID(),
                        subTaskName: inputElement.value }
        phantomTaskObject["subtasks"].push(subtask);
        rendersubtask();
    } 
    return isSaved
}


function deleteSubtask(id){
    phantomTaskObject["subtasks"].splice(id, 1);
    rendersubtask();
}


function checkIsAssignedto(contactId){
    let imgpath = "../img/icons/check-button-mobile-uncheck.svg";
        for (let i = 0; i < phantomTaskObject["assignedTo"].length; i++){
            Searchkey = phantomTaskObject["assignedTo"][i]["contactID"];
            if(contactId == phantomTaskObject["assignedTo"][i]["contactID"]){
                imgpath = "../img/icons/check-button-mobile-check.svg";
            }
        }
    return imgpath;
}


function searchInAssignTo(){
    let toSearch = document.getElementById("selectInput_1").value;
    let content = document.getElementById("selectArea_1");
    content.innerHTML = "";
    for (let i  = 0; i < boardContacts.length; i++){
        let contactId = boardContacts[i]["contactID"]
        let currentName = boardContacts[i]["name"].toLowerCase();
        let currentEmail = boardContacts[i]["email"].toLowerCase();
        if(toSearch.length > 0 && currentName.includes(toSearch.toLowerCase()) || currentEmail.includes(toSearch.toLowerCase())){
            content.innerHTML += templateProfilForAssignTo(i, contactId);
        } else if(toSearch.length <= 0){
            renderProfilsInAssignToEdit();
        }
    }
}

