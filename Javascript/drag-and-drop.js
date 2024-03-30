let currenOnDrag = "";


function show_dragzone(){
    let dragZone = document.querySelectorAll("[drag-zone]");
    for (let i = 0; i < dragZone.length; i++){
        dragZone[i].classList.add("class_show");
    }
    showNoCard();
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


function startDragFrom(columnId, id, atAllboolean){
    showDropZone(columnId, atAllboolean);
    currenOnDrag = [columnId, id]
}


function moveTo(category){
    list[currenOnDrag[0]][currenOnDrag[1]]["currentProgress"] = category;
    refreshColumnRender();
}


function endDrag(columnId, atAllboolean){
   hideDropZone(columnId, atAllboolean);
}

