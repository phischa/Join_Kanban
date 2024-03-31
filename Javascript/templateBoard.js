function templateCard(columnNumber, id){
    return `<div id="ColumnNumb-${columnNumber}_Id-${id}" draggable="true" onclick="showBlackBox(), openLightboxCard(${columnNumber}, ${id})" ondragstart="startDragFrom(${columnNumber}, ${id}, false)" ondragend="endDrag(${columnNumber}, true)">
    <div isCard card-in-column="${columnNumber}" class="card">
    <div class="category">${generateCategory(columnNumber, id)}</div>
    <div class="headline">${list[columnNumber][id]["title"]}</div>
    <div class="content">${setText(columnNumber, id)}</div>
      ${isSubtask(columnNumber, id)}
    <div class="footer-of-card">
      <div class="submit-user-area">
          <div class="avatar orange">OR</div>
          <div class="avatar pruple">NP</div>
          <div class="avatar yellow">YE</div>
          <div class="avatar pink">PI</div>
          <div class="avatar green">GR</div>
          <div class="avatar turquoise">TU</div>
          <div class="avatar red">HF</div>
      </div>
      <div class="priority">
        <img src="${setPriorityImage(columnNumber, id)}">
      </div>
    </div>
</div>
</div>`;
}




function templateLightboxCards(columnNumber, id){
  return `
  <div class="LightboxCards">
    <div class="frow facenter fs-between padding-top"><div class="category">${generateCategory(columnNumber, id)}</div><div class="exit_button-edit-task" onclick='hideBlackbox()'><img src="../img/icons/close-icon-addtask_dark.svg"></div></div>
    <h1>${list[columnNumber][id]["title"]}</h1>
    <p class="LightboxContent-P">${list[columnNumber][id]["description"]}</p>
    <p class="LightboxContent-P"><span>Due date:</span><span>${setDateFormat(columnNumber, id)}</span></p>
    <p class="LightboxContent-P"><span>Priority:</span><span></span>${setPriorityName(columnNumber, id)} <img src="${setPriorityImage(columnNumber, id)}"></span></p>
    <h6>Assign To:</h6>
    <ol id="cardLightboxUser">
      <li><div class="circle red">HF</div><p>Haru Featherflame</p></li>
      <li><div class="circle pruple">NP</div><p>Neraphine Perishwhite</p></li>
      <li><div class="circle green">H</div><p>Old man called Herb</p></li>
      <li><div class="circle orange">KS</div><p>Kingdom Sun-Imperia</p></li>
    </ol>
    <h6>Subtaks:</h6>
    <ol id="cardLightboxSubtask" class="selectabale">
          ${generateListOfSubtask(columnNumber, id)}
    </ol>
    <nav class="lightboxNav">
      <ul>
          <li>Delete<img src="../img/icons/delete.svg"></li>
          <hr>
          <li>Edit<img src="../img/icons/edit-black.svg"></li>
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