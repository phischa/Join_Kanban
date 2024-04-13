function openAddTask(){
    addTaskInBoardInit();

}

async function addTaskInBoardInit(){
    await loadContacts();
    await loadActualUser();
    addContactsToPage();
    CheckforUnclosedWindows();
    checkRequirementsMouseover();
    CheckMouseoutCreateTask();
    stopSubtaskPropagation();
    stopPropagationContacts();
}