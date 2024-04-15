let currentColumn = 0;

function openAddTask(number){
    addTaskInBoardInit();
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

function submitTaskOnBoard(){
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
        setTimeout(hideBlackbox(), 500);
}

function clearAddTask(){
    let checkboxes = document.getElementById("checkboxes");
    checkboxes.innerHTML = "";
    clearForm();
}