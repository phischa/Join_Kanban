let setNewPriority = null;
let boardContacts = []
let phantomTaskObject = {
    taskID: "",
    title: "",
    description: "",
    dueDate: "",
    assignedTo:[],
    category: "string",
    currentProgress: "number",
    subtasks:[],
};

let editSubtask = [];

function actualizeSubtasks(){
    console.log("actualizeSubtasks");
    subtasksOfActualTask = phantomTaskObject.subtasks;
}

async function loadBoardContacts(){
    let loadedBoardContacts = [];
    loadedBoardContacts = await getItem('contacts');
    if (loadedBoardContacts.data && loadedBoardContacts.data.value && loadedBoardContacts.data.value!="null"){
        boardContacts = JSON.parse(loadedBoardContacts.data.value);
    } else {console.warn("RemoteStorage hat keine Kontakte gespeichert.")} 
}


function saveChagesToTask(columnNumber, id){
    /*let newTextJSON = JSON.stringify(phantomTaskObject);
    let newJSON = JSON.parse(newTextJSON);
    list[columnNumber][id] = newJSON;*/
    list[columnNumber][id] = phantomTaskObject;
    //taskId = list[columnNumber][id]["taskID"];
    console.log("Current Task ________________________");
    console.log(list[columnNumber][id]);
    console.log("________________________");
    console.log("phantomTaskObject________________________");
    console.log(phantomTaskObject);
    console.log("________________________");
    saveCurrentTask(columnNumber, id, false);
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
    generatePseudoObject(columnNumber, id, 0);
    generatePseudoObject(columnNumber, id, 1);
    setChagesToPhantomTask(columnNumber, id);

    //loadTaskToPhantomTask(columnNumber, id)
    checkCurrentPrio(columnNumber, id);
    rendersubtask();
    renderProfilsInAssignToEdit();
}


function iteratetThoughObject(currentObject){
    let newArray = [];
    let emptyObject = {}
    for (let i = 0; i < currentObject.length; i++){
        Object.assign(emptyObject, currentObject[i]);
        newArray.push(emptyObject);
        emptyObject = {}
    }
    return newArray;
}


function generatePseudoObject(columnNumber, id, modus = 0){
    let customObject = {};
    let currentObject ={};
    let keyword = "";
    if (modus == 0){
        currentObject = list[columnNumber][id]["assignedTo"];
        keyword = "assignedTo";
        console.log("modus = 0")
    } else if(modus == 1){
        currentObject = list[columnNumber][id]["subtasks"];
        keyword = "subtasks";
        console.log("modus = 1")
    }
    customObject = { [keyword] : iteratetThoughObject(currentObject) };
    Object.assign(phantomTaskObject, customObject)
}


function setNewestPriority(){
    let options = ["urgent","medium","low"];
    let currentOption = null;
    if (setNewPriority != null){
        currentOption = options[setNewPriority];
    }
    return currentOption;
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
    if(isRequired){
        setChagesToPhantomTask(columnNumber, id);
        saveChagesToTask(columnNumber, id);
        refreshColumnRender();
        openLightboxCard(columnNumber, id);
    }
}


function setChagesToPhantomTask(columnNumber, id){
    phantomTaskObject["taskID"] = list[columnNumber][id]["taskID"]
    phantomTaskObject["title"] = document.getElementById("lightboxEditTitle").value;
    phantomTaskObject["description"] = document.getElementById("lightboxEditText").value;
    phantomTaskObject["dueDate"] = document.getElementById("ldatename").value;
    phantomTaskObject["priority"] = setNewestPriority();
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
            content.innerHTML += templateSubtaskEdit(subtask, i);
        }
    } else{
        content.innerHTML = `<li class="stopHover noSubtask"><div class="NosubtaskContainer">Keine Subtasks vorhanden!<div></li>`;
    }
}


function addNewSubTask(id){
    console.log("addNewSubtask") //löschen
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


function makeEditSubtask(id){
    let content = document.getElementById(`subtask_${id}`);
    content.innerHTML = refreshtemplateSubtaskInEdit(id);
    console.log("edit")
}

function saveChagesSubtask(id){
    delerror();
    let newValue = document.getElementById(`subtask_${id}_input`).value
    let parentElement = document.getElementById(`subtask_${id}_input`);
    if(newValue.length <= 0){
        seterror(parentElement, "Ups. This Field is required.")
    } else{
        let content = document.getElementById(`subtask_${id}`);
        phantomTaskObject["subtasks"][id]["subTaskName"] = newValue;
        content.innerHTML = refreshtemplateSubtaskEdit(newValue, id);
    }
}

function undoChagesSubtask(id){
    delerror();
    let subtask =  phantomTaskObject["subtasks"][id]["subTaskName"]
    let content = document.getElementById(`subtask_${id}`);
    content.innerHTML = refreshtemplateSubtaskEdit(subtask, id);
}



