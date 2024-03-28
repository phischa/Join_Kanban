function onload(){
    loadContacts();
    loadTasks();
    loadUsers();
    renderSummary();
}

function renderSummary(){
    renderGreeting();

    renderNumberToDo();
    renderNumberDone();
    renderNumberUrgent();
    renderUpcomingDueDate();
    renderNumberTaksInBoard();
    renderNumberInProgress();
    renderNumberAwaitingFeedback();

}


function renderGreeting(){
    
    renderDaytime();
    renderUserName();
}

function renderDaytime(){

}

function renderUserName(){
    user = actualUser.name;
}


