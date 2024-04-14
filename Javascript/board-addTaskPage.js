let currentColumn = 0;

function openAddTask(){
    addTaskInBoardInit();
}


async function addTaskInBoardInit(setColumn = 0){
    await loadContacts();
    await loadActualUser();
    addContactsToPage();
    checkforUnclosedWindows();
    checkRequirementsMouseover();
    checkMouseoutCreateTask();
    stopSubtaskPropagation();
    stopPropagationContacts();
    currentColumn = setColumn;
}


async function searchAndResortTask(TaskId, newColumn){
   let coordinates = search(searchValue, modus = 1);
   list[coordinates[0]][coordinates[1]]["currentProgress"] = newColumn;
   await saveCurrentTask(null, null, TaskId);
   refreshColumnRender();
}