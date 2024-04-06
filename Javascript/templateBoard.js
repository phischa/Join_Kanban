function templateRefreshCard(columnNumber, id){
  return `
  <div isCard card-in-column="${columnNumber}" class="card">
    <div class="category">${generateCategory(columnNumber, id)}</div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${setText(columnNumber, id)}</div>
      ${isSubtask(columnNumber, id)}
    <div class="footer-of-card">
      <div class="submit-user-area">
          ${generateAssignedTo(columnNumber, id, true)}
      </div>
      <div class="priority">
        <img src="${setPriorityImage(columnNumber, id)}">
      </div>
    </div>
</div>
  `
}


function templateCard(columnNumber, id){
    return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" onclick="showBlackBox()" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
    ${templateRefreshCard(columnNumber, id)}   
</div>`;

/* 
return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" onclick="showBlackBox(), openLightboxCard(${columnNumber}, ${id}, false)" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
${templateRefreshCard(columnNumber, id)}   
</div>`;*/
}


function getHTMLCode(categoryColor, text){
  return `<div class="tag ${categoryColor}">${text}</div>`
}


function templateLightboxCards(columnNumber, id){
  return `
  <div class="LightboxCards">
    <div class="frow facenter fs-between padding-top"><div class="category">${generateCategory(columnNumber, id)}</div><div class="exit_button-edit-task" onclick='setEditOff(), hideBlackbox()'><img src="../img/icons/close-icon-addtask_dark.svg"></div></div>
    <h1>${list[columnNumber][id]["title"]}</h1>
    <p class="LightboxContent-P">${list[columnNumber][id]["description"]}</p>
    <p class="LightboxContent-P"><span>Due date:</span><span>${setDateFormat(columnNumber, id)}</span></p>
    <p class="LightboxContent-P"><span>Priority:</span><span></span>${setPriorityName(columnNumber, id)} <img src="${setPriorityImage(columnNumber, id)}"></span></p>
    <h6>Assign To:</h6>
    <ol id="cardLightboxUser">
      ${generateAssignedTo(columnNumber, id, false)}
    </ol>
    <h6>Subtaks:</h6>
    <ol id="cardLightboxSubtask" class="selectabale">
          ${generateListOfSubtask(columnNumber, id)}
    </ol>
    <nav class="lightboxNav">
      <ul>
          <li onclick ="deleteCurrentTask(${columnNumber},${id})">Delete<img src="../img/icons/delete.svg"></li>
          <hr>
          <li onclick ="toogleEditableMode(${columnNumber},${id})">Edit<img src="../img/icons/edit-black.svg"></li>
      </ul>
    </nav>
  </div>
`
}


function templateLightboxCardsEdit(columnNumber, id){
  return `

  <div class="LightboxCards">
    <div class="frow facenter fs-between padding-top"><div class="category">${generateCategory(columnNumber, id)}</div><div class="exit_button-edit-task" onclick='setEditOff(), hideBlackbox()'><img src="../img/icons/close-icon-addtask_dark.svg"></div></div>
    <p>${list[columnNumber][id]["title"]}<p>
    <p class="LightboxContent-P">${list[columnNumber][id]["description"]}</p>
    <p class="LightboxContent-P"><span>Due date:</span><span>${setDateFormat(columnNumber, id)}</span></p>
    <p class="LightboxContent-P"><span>Priority:</span><span></span>${setPriorityName(columnNumber, id)} <img src="${setPriorityImage(columnNumber, id)}"></span></p>
    <h6>Assign To:</h6>
    <ol id="cardLightboxUser">
      ${generateAssignedTo(columnNumber, id, false)}
    </ol>
    <h6>Subtaks:</h6>
    <ol id="cardLightboxSubtask" class="selectabale">
          ${generateListOfSubtask(columnNumber, id)}
    </ol>
    <nav class="lightboxNav">
      <ul>
          <li onclick ="deleteCurrentTask(${columnNumber},${id})">Delete<img src="../img/icons/delete.svg"></li>
          <hr>
          <li onclick ="toogleEditableMode(${columnNumber},${id})">Edit<img src="../img/icons/edit-black.svg"></li>
      </ul>
    </nav>
  </div>
`
}


function templateSubTask(columnNumber, id){
    return ` 
        <div class="subtask-bar">    
            <div class="bar">
             <div class="progress-bar" style="width:${returnProgressbar(columnNumber, id)}%;"></div>
            </div>
                ${checkSubtaskdone(columnNumber, id)}/${list[columnNumber][id]["subtasks"].length} Subtasks
            </div>
        `
    }