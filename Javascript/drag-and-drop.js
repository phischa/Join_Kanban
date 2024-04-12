let currenOnDrag = "";
isMobil = checkIsMobil();


addEventListener("resize", (event) => {
    isMobil = checkIsMobil();
    hideDropZone(0, true)   
})


function checkIsMobil(){
    let isMobil = false;
    let screenwith = window.innerWidth;
    if (screenwith < 1920){
        isMobil = true;
    }
    return isMobil
}


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
        columns[i].innerHTML += `<div drag-zone class="show_dragzone class_show" ondrop="moveTo(${columnsName[i]})" ondragover="allowDrop(event)"></div>`;
        columns[i].parentElement.innerHTML += `<div drag-zone-mobil class="mobil_dragzon" ondrop="moveTo(${columnsName[i]})" ondragover="allowDrop(event)">Drop Card here</div>`
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


function selectViewerQuery(){
    let isCurrentmobil = checkIsMobil();
    let element = ""
    if(isCurrentmobil){
        element = document.querySelectorAll("[drag-zone-mobil]");
    } else if (!isCurrentmobil){
        element = document.querySelectorAll("[drag-zone]");
    }
    return element;
}


function hideDropZone(columnId, atAll){
    let isCurrentmobil = checkIsMobil();
    let dragZoneElement = selectViewerQuery()
    for (let i = 0; i < dragZoneElement.length; i++){
        if(columnId != i || atAll){
        dragZoneElement[i].classList.remove("class_show");
        }
    }
    if (isCurrentmobil){
        blurCard(0, true);
    }
    showNoCard();
}


function showDropZone(columnId, atAll){
    let isCurrentmobil = checkIsMobil();
    let dragZoneElement = selectViewerQuery();
    for (let i = 0; i < dragZoneElement.length; i++){
        if(columnId != i || atAll){
        dragZoneElement[i].classList.add("class_show");
        }  
    }
    if (isCurrentmobil){
        blurCard(columnId);
    }
     hideNoCard();
}


function blurCard(columnId, removeAll = false){
    let currentAttribute = 0;
    let allElement = document.querySelectorAll("[isCard]");
    for(let i = 0; i < allElement.length; i++){
        if(!removeAll){
            currentAttribute = allElement[i].getAttribute("card-in-column");
            if  (currentAttribute != columnId){
                allElement[i].classList.toggle("addBlur");
            }
        } else {
            allElement[i].classList.remove("addBlur");
        }
    }
}


function startDragFrom(columnId, id, atAllboolean){
    showDropZone(columnId, atAllboolean);
    currenOnDrag = [columnId, id]
}


async function moveTo(category){
    let currentId = list[currenOnDrag[0]][currenOnDrag[1]]["taskID"]
    list[currenOnDrag[0]][currenOnDrag[1]]["currentProgress"] = category;
    await saveCurrentTask(currenOnDrag[0],currenOnDrag[1], false);
    await refreshColumnRender();
}


function endDrag(columnId, atAllboolean){
   hideDropZone(columnId, atAllboolean);
}