let subtasksOfAddPage= [];
let finalSubtasksOfAddPage=[];
let actualSubtaskOfAddPage;


// ------------ UI Handling --------------

function focusSubtaskInput(){
    document.getElementById('subTaskInputField').style.border = '2px solid #25C0D4';
}

function blurSubtaskInput(){
    document.getElementById('subTaskInputField').style.border = '0.063rem solid #D1D1D1';
}

function focusSubtaskEdit(index){
    document.getElementById(`subtaskRenderAreaRow${index}`).style.borderBottom = '1px solid #25C0D4';
}

function blurSubtaskEdit(index){
    document.getElementById(`subtaskRenderAreaRow${index}`).style.borderBottom = '';
}


function changeEditSubTaskToShowSubtask(index){
    document.getElementById(`subtaskRenderAreaRowIcons${index}`).classList.remove('noDisplay');
    document.getElementById(`editSubTaskItem${index}`).classList.remove('noDisplay');
    document.getElementById(`deleteSubTaskItem${index}`).classList.remove('noDisplay');
    document.getElementById(`dividerEditSubtask${index}`).classList.remove('noDisplay'); 
    document.getElementById(`bulletpoint${index}`).classList.remove('noDisplay');
    document.getElementById(`subTaskContentContent${index}`).classList.remove('noDisplay');
    document.getElementById(`subtaskRenderAreaRowIconsForEdit${index}`).classList.add('noDisplay');
    document.getElementById(`confirmChange${index}`).classList.add('noDisplay'); 
    document.getElementById(`cancelChange${index}`).classList.add('noDisplay');
    document.getElementById(`dividerChanges${index}`).classList.add('noDisplay');
}


function changeShowSubtaskToEditSubtask(index){
    document.getElementById(`subtaskRenderAreaRowIcons${index}`).classList.add('noDisplay');
    document.getElementById(`editSubTaskItem${index}`).classList.add('noDisplay');
    document.getElementById(`deleteSubTaskItem${index}`).classList.add('noDisplay');
    document.getElementById(`dividerEditSubtask${index}`).classList.add('noDisplay'); 
    document.getElementById(`subtaskRenderAreaRowIconsForEdit${index}`).classList.remove('noDisplay');
    document.getElementById(`confirmChange${index}`).classList.remove('noDisplay'); 
    document.getElementById(`cancelChange${index}`).classList.remove('noDisplay');
    document.getElementById(`dividerChanges${index}`).classList.remove('noDisplay');
}


function changeAddToConfirmOrCancelInSubtask(){
    document.getElementById('addButton').classList.add('noDisplay');
    document.getElementById('addButtonIcon').classList.add('noDisplay');
    document.getElementById('CancelAndOkButtonArea').classList.remove('noDisplay');
    document.getElementById('cancelButton').classList.remove('noDisplay');
    document.getElementById('cancelIcon').classList.remove('noDisplay');
    document.getElementById('checkIcon').classList.remove('noDisplay');
    document.getElementById('okButton').classList.remove('noDisplay');
}


function changeConfirmOrCancelToAddInSubtask(){
    document.getElementById('addButton').classList.remove('noDisplay');
    document.getElementById('addButtonIcon').classList.remove('noDisplay');
    document.getElementById('CancelAndOkButtonArea').classList.add('noDisplay');
    document.getElementById('cancelButton').classList.add('noDisplay');
    document.getElementById('cancelIcon').classList.add('noDisplay');
    document.getElementById('okButton').classList.add('noDisplay');
    document.getElementById('checkIcon').classList.add('noDisplay');
}


// ---------- Functions --------------

function finalizeSubtasks(){
    for(let i = 0; i < subtasksOfAddPage.length; i++){
        finalSubtasksOfAddPage.push(createSubtask(subtasksOfAddPage[i]));
    }
}


function confirmChange(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    subtasksOfAddPage[index]=input.value;
    input.value='';
    input.classList.add('noDisplay');
    document.getElementById(`subTaskContent${index}`).innerHTML= `<img class="bulletpoint" id="bulletpoint${index}" src="../img/icons/bulletpoint.svg"></img> <div class="subTaskContentContent" id="subTaskContentContent${index}"> ${subtasksOfAddPage[index]}</div>`;
    document.getElementById(`subTaskContent${index}`).classList.remove('noDisplay');
    changeEditSubTaskToShowSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.remove('lightBackground');
}


function cancelChange(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    input.value='';
    input.classList.add('noDisplay');
    document.getElementById(`subTaskContent${index}`).classList.remove('noDisplay');
    changeEditSubTaskToShowSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.remove('lightBackground');
}


function clickDeleteSubTaskItem(index){
    subtasksOfAddPage.splice(index, 1);
    renderSubtaskArea();
}


function clickEditSubTaskItem(index){
    let input = document.getElementById(`editSubTaskField${index}`);
    input.value = subtasksOfAddPage[index];
    input.classList.remove('noDisplay');
    document.getElementById(`subTaskContent${index}`).classList.add('noDisplay');
    document.getElementById(`bulletpoint${index}`).classList.add('noDisplay');
    document.getElementById(`subTaskContentContent${index}`).classList.add('noDisplay');
    changeShowSubtaskToEditSubtask(index);
    document.getElementById(`subtaskRenderAreaRow${index}`).classList.add('lightBackground');
    input.focus();
}


function pressAddSubtaskButton(){
    changeAddToConfirmOrCancelInSubtask();
    clearSubtaskInput();
    let input= document.getElementById('lsubtaskname');
    input.disabled=false;
    input.focus();
}


function pressConfirmSubtaskButton(){
    if (document.getElementById('lsubtaskname').value!=""){
    subtasksOfAddPage.push(document.getElementById('lsubtaskname').value);
    
    //document.getElementById('lsubtaskname').disabled=true;
    document.getElementById('lsubtaskname').focus();
    clearSubtaskInput();
    renderSubtaskArea();

    } else {
        changeConfirmOrCancelToAddInSubtask();
    }
}


function pressCancelSubtaskButton(){
    document.getElementById('lsubtaskname').disabled=true;
    changeConfirmOrCancelToAddInSubtask();
    clearSubtaskInput();
}    


function clearSubtaskInput(){
    document.getElementById('lsubtaskname').value = "";
}

//------------ Render and HTML

function renderSubtaskArea(){
    
    clearRenderArea();
    for (let i = 0; i < subtasksOfAddPage.length; i++){
        
        content.innerHTML += subtaskHTML(i);
    }
}


function clearRenderArea(){
    content = document.getElementById('subtaskRenderAreaList');
    content.innerHTML = '';
}


function subtaskHTML(index){
    
    return `
    <div class="subtaskRenderAreaRow" id="subtaskRenderAreaRow${index}"> 
        
        <div class="subTaskContent" id="subTaskContent${index}">
        <img class="bulletpoint" id="bulletpoint${index}" src="../img/icons/bulletpoint.svg">
        <div class="subTaskContentContent" id="subTaskContentContent${index}"> ${subtasksOfAddPage[index]}</div>
        </div>
        <input id="editSubTaskField${index}" onfocus="focusSubtaskEdit(${index})" onblur="blurSubtaskEdit(${index})" class="noDisplay editSubtaskInput">  
        <div>
            <div class="subtaskRenderAreaRowIcons" id="subtaskRenderAreaRowIcons${index}">
                <div id="editSubTaskItem${index}" onclick="clickEditSubTaskItem(${index})" class="editSubTask" > 
                <img src="../img/icons/edit-black.svg">  
                </div>
                <div id="dividerEditSubtask${index}"> | </div>
                <div id="deleteSubTaskItem${index}" onclick="clickDeleteSubTaskItem(${index})" class="deleteSubTask" >
                <img src="../img/icons/delete.svg"> 
                </div>
            </div>
            <div class="subtaskRenderAreaRowIconsForEdit noDisplay" id="subtaskRenderAreaRowIconsForEdit${index}">
                <div id="cancelChange${index}" onclick="cancelChange(${index})"class ="cancelChange noDisplay">
                <img src="../img/icons/delete.svg">
                </div>
                <div id="dividerChanges${index}" class="noDisplay"> | </div>
                <div id="confirmChange${index}" onclick="confirmChange(${index})"class="confirmChange noDisplay">
                <img src="../img/icons/check-icon-adTask_black.svg">
                </div>
            </div>
        </div>
    </div>
    `;
}
