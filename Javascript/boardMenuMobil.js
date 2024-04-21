let latestTouchPressedTime = 0;
let holdingtime = 650;
let currentTimeOutId = "";
let currentElementId = []


function onPressTouchDown(columnId, id){
    latestTouchPressedTime = Date.now();
    currentTimeOutId = setTimeout(isTimeOver, holdingtime);
    currentElementId = [columnId, id]
}


function isTimeOver(){
    let currentTime = Date.now();
    if(currentTime - holdingtime >= latestTouchPressedTime){
        createPopUpMenu(currentElementId[0],currentElementId[1]);
        document.getElementById(`ColumnNumb-${currentElementId[0]}_Id-${currentElementId[1]}`).addEventListener("click", function(event){event.preventDefault()})
    }
}


function isTouchUp(){
   clearTimeout(currentTimeOutId);
}


function createPopUpMenu(){
    let elementId = document.getElementById(`ColumnNumb-${currentElementId[0]}_Id-${currentElementId[1]}`);
    let newNode = document.createElement("div");
    deletePopUpMenu();
    newNode.setAttribute("id", "newPopUpMenu");
    newNode.setAttribute("popUpMenu", "")
    newNode.setAttribute("ontouch", "preventClick(event)");
    newNode.setAttribute("onclick", "preventClick(event)");
    elementId.insertAdjacentElement('beforeend', newNode);
    renderPopMenu();
    renderOption(currentElementId[0]);
}


function deletePopUpMenu(){
    let elements = document.querySelectorAll(`[popUpMenu]`)
    for (let i = 0 ; i < elements.length; i++){
        elements[i].remove();
    }
}


function renderPopMenu(){
    let content = document.getElementById("newPopUpMenu");
    content.innerHTML = templatePopUpMenu(currentElementId[0],currentElementId[1]);
}


function preventClick(event){
    event.stopPropagation();
}


function renderOption(columnId){
   let content = document.getElementById("currentPopUpMenu");
   let contentArray = [
    `<li onclick="moveCardTo(${currentElementId[0]}, ${currentElementId[1]}, 0)">To do</li>`,
    `<li onclick="moveCardTo(${currentElementId[0]}, ${currentElementId[1]}, 1)">In Progress</li>`,
    `<li onclick=" moveCardTo(${currentElementId[0]}, ${currentElementId[1]}, 2)">Await feedback</li>`,
    `<li onclick="moveCardTo(${currentElementId[0]}, ${currentElementId[1]}, 3)">Done</li>`,
   ];
   content.innerHTML = "";
   for (let i = 0; i < 4; i++){
        if (i != columnId){
            content.innerHTML += contentArray[i];
        }
    }
}


async function moveCardTo(columnId, id, newColumnId){
    let content = document.getElementById("newPopUpMenu");
    list[columnId][id]["currentProgress"] = newColumnId;
    content.innerHTML = "<div class='savePopMenuChange'>Position of your Card has changed.<div class='PopMenuImg'><img src='../img/icons/check-mark.svg'></div></div>";
    setTimeout(closePopMenu, 750);
    await saveCurrentTask(columnId, id, false);
}


function closePopMenu(){
    deletePopUpMenu()
    refreshColumnRender();
}