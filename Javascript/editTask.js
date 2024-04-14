let setNewPriority = null;
let boardContacts = []
let phantomTaskObject = {};
let editSubtask = [];


function actualizeSubtasks(columnId, id){
    subtasksOfActualTask = list[columnId][id]["subtasks"];
}


function editActucalTask(columnId, id){
    actualTask = list[columnId][id];
}


async function loadBoardContacts(){
    let loadedBoardContacts = [];
    loadedBoardContacts = await getItem('contacts');
    if (loadedBoardContacts.data && loadedBoardContacts.data.value && loadedBoardContacts.data.value!="null"){
        boardContacts = JSON.parse(loadedBoardContacts.data.value);
    } else {console.warn("RemoteStorage hat keine Kontakte gespeichert.")} 
}


async function saveChagesToTask(columnNumber, id){
    list[columnNumber][id] = phantomTaskObject;
    await saveCurrentTask(columnNumber, id, false);
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
    checkCurrentPrio(columnNumber, id);
    rendersubtask();
    renderProfilsInAssignToEdit();
    setMinDate();
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
    } else if(modus == 1){
        currentObject = list[columnNumber][id]["subtasks"];
        keyword = "subtasks";
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


async function checkAndSave(columnNumber, id){
    delerror();
    let isRequired = checkRequiredInputs();
    let parentElement = document.getElementById("savebutton");
    if(isRequired){
        setChagesToPhantomTask(columnNumber, id);
        await saveChagesToTask(columnNumber, id);
        taskObjects = [];
        await baordLoadTasks();
        refreshColumnRender(loadAll = true);
        openLightboxCard(columnNumber, id);
    } else{
        seterror(parentElement, "Ups, Some requirements are missing");
    }
}


function setChagesToPhantomTask(columnNumber, id){
    phantomTaskObject["taskID"] = list[columnNumber][id]["taskID"];
    phantomTaskObject["title"] = document.getElementById("lightboxEditTitle").value;
    phantomTaskObject["description"] = document.getElementById("lightboxEditText").value;
    phantomTaskObject["dueDate"] = document.getElementById("ldatename").value;
    phantomTaskObject["category"] = list[columnNumber][id]["category"];
    phantomTaskObject["priority"] = setNewestPriority();
    phantomTaskObject["currentProgress"] = list[columnNumber][id]["currentProgress"];
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


function checkSuptaskForError(allEditSuptaskInputs){
    let ischeked = true;
    let idFromInput = "";
    for(let i = 0; i < allEditSuptaskInputs.length; i++){
        if(allEditSuptaskInputs[i].value.length <= 0){
            ischeked = false;
        }
        idFromInput = allEditSuptaskInputs[i].getAttribute("openEditInputField")
        saveChagesSubtask(idFromInput);
    }
    return ischeked;
}


function checkRequiredInputs(){
    let title = document.getElementById("lightboxEditTitle");
    let date = document.getElementById("ldatename");
    let allEditSuptaskInputs = document.querySelectorAll("[openEditInputField]");
    let elementArray = [title, date];
    let isCheked = checkForError(elementArray, "Ups. This Field is required.");
    let isSubtaskCheked = checkSuptaskForError(allEditSuptaskInputs);
    if( isCheked && isSubtaskCheked){
        return true;
    }
    return false;
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
    if (phantomTaskObject["subtasks"].length > 0){
        for (let i = 0; i < phantomTaskObject["subtasks"].length; i++){
            content.innerHTML += templateSubtaskEdit(phantomTaskObject["subtasks"][i]["subTaskName"], i);
        }
    } else{
        content.innerHTML = `<li class="stopHover noSubtask"><div class="NosubtaskContainer">Keine Subtasks vorhanden!<div></li>`;
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


function makeEditSubtask(id){
    let content = document.getElementById(`subtask_${id}`);
    content.innerHTML = refreshtemplateSubtaskInEdit(id);
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


function changeStatusAssignTo(contactId, id){
    let isFound = false;
    let array = phantomTaskObject["assignedTo"];
    for(let i = 0; i < phantomTaskObject["assignedTo"].length; i++){
       if(array[i]["contactID"] == contactId){
        isFound = true;
        array.splice(i,1);
       }
    }
    if(isFound == false){
        array.push(boardContacts[id]);
    }
    renderProfilsInAssignToEdit();
}
