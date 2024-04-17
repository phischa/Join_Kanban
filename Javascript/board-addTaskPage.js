let currentColumn = 0;

async function openAddTask(number){
    await addTaskInBoardInit(number);
    currentColumn = number;
}


async function addTaskInBoardInit(setColumn = 0){
    filteredContacts = [];
    contactsOfAddPage = [];
    assignedContacts = [];
    filteredContacts = [];
    currentColumn = setColumn;
    renderAddTaskTemplateLightBox();
    clearAddTask()
    setMinDate();
    loadTasks();
    loadUsers();
    await loadContacts();
    await loadActualUser();
    addContactsToPage();
    CheckforUnclosedWindows();
    checkRequirementsMouseover();
    CheckMouseoutCreateTask();
    stopSubtaskPropagation();
    stopPropagationContacts();
}


async function searchAndResortTask(TaskId, newColumn){
   let coordinates = search(searchValue, modus = 1);
   list[coordinates[0]][coordinates[1]]["currentProgress"] = newColumn;
   await saveCurrentTask(null, null, TaskId);
   refreshColumnRender();
}

function renderAddTaskTemplateLightBox(){
    content = document.getElementById("cardLightboxContent");
    content.innerHTML = templateAddTaskLightbox();
}

async function submitTaskOnBoard(){
        let title = document.getElementById("ltitlename");
        let description = document.getElementById("ldescriptionname").value;
        let assigned = assignedContacts;
        let date = document.getElementById("ldatename").value;
        let prio = priority;
        let category = document.getElementById("lcategoryname").value;
        finalizeSubtasks();
        let subtasks = finalSubtasksOfAddPage;
        createTask(title.value, description, assigned, date, prio, category, subtasks);
        storeTasks();
        clearRenderArea();
        title.value = title.defaultValue;
        clearForm();
        await setTaskToBoard();
}

async function setTaskToBoard(){
    await reloadData();
    setTimeout(hideBlackbox(), 500); 
}


function clearAddTask(){
    let checkboxes = document.getElementById("checkboxes");
    checkboxes.innerHTML = "";
    clearForm();
}

function sortNewTaskToColumn(){
    let TaskCoordinates = search(currentTaskId, modus = 1);
    console.log(TaskCoordinates);
    let task =  list[TaskCoordinates[0]][TaskCoordinates[1]];
    task["currentProgress"] = currentColumn;
    search("   ");
}

async function reloadData(){
    await baordLoadTasks();
    await loadActualUser();
    await initialsOf();
    sortLoadetTasks();
    cleanAllColums();
    checkForCard();
    showNoCard();
    initDropZone();
    hideDropZone(0, true);
    sortNewTaskToColumn();
    console.log(list);
    search(" ");
}



function setBorderAtSubtask(){
    let SubtaskListElement = document.getElementById("subtaskRenderAreaList");
    let isOnBoard = SubtaskListElement.hasAttribute("isOnBoard");
    if(isOnBoard && subtasksOfAddPage.length <= 0){
        SubtaskListElement.classList.remove("border");
    } else if(isOnBoard && subtasksOfAddPage.length > 0){
        SubtaskListElement.classList.add("border");
    }
}