function saveNewSubtask(newTask, elementId){
    let SubtaskList = document.getElementById(`cardLightboxSubtask`);
    if(newTask.length > 0 && newTask != null){
        SubtaskList.innerHTML += `<li>${newTask}</li>`
    } else{
        seterror(elementId, "Need to fill this Field!");
        console.log("Error")
    }
}

function seterror(elementId, text){
    let parentElement = document.getElementById(`${elementId}`);
    let textNode = document.createTextNode(`${text}`);
    let newNode = document.createElement("span");
    newNode.appendChild(textNode);
    newNode.setAttribute("id", "error");
    parentElement.insertAdjacentElement('afterend', newNode);
}



function setEditOff(columnNumber, id, closeLightbox){
    isInEdit = false;
}



function openEditableMode(columnNumber, id){
    let content = document.getElementById(`cardLightboxContent`)
    content.innerHTML = templateLightboxEditTask(columnNumber, id);
}


//    Experimental Code 

function saveChages(columnNumber, id){
    fetchAndSaveSubtaskEdit(columnNumber, id);
}

function fetchAndSaveSubtaskEdit(columnNumber, id){
    let subtask =  list[columnNumber][id]["subtasks"]
    for (let i = 0; i < subtask.length; i++){
        console.log(`input_${columnNumber}id_${i}`);
        currentElement = document.getElementById(`input_${columnNumber}id_${i}`).value;
        list[columnNumber][id]["subtasks"][i]["subTaskName"] = currentElement;
    }
    saveCurrentTask(columnNumber,id, false);
}


function toogleEditableMode(columnNumber, id){
    isInEdit = isInEdit ^ true;
    if(!isInEdit){
        saveChages(columnNumber, id);
    }
    openLightboxCard(columnNumber, id, isInEdit)
}