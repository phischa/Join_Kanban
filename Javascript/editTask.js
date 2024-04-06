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