const STORAGE_TOKEN = "pEi5FKcwpcQR2iv30dQpE9dkrGpKeizYWMbvw5JVF4vmEfGoRr6pXJxUgCtmfHIs";
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let tasks=[];
let actualTask; 
// Wenn eine Aufgabe angesehen wird, sollte sie hier "actualTask" hinein 
//geladen werden. dies geschieht mit setAsActualTask(id)
//Nach der Editierung ihrer Bestandteile muss die actualTask
//dann ins tasksArray an die Position gespeichert werden, von der sie genommen wurde.
//Das geschieht mit saveActualTask()

let contacts=[];
let actualContact;

let users=[];
let actualUser;

let subtasksOfActualTask=[];
let actualSubtask;


//Functions

/** generates unique ID from random Numbers
 * 
 * @yields {string}
 */
function createID(){
    let id = "";
    let numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 0; i < 16; i++){
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    //TODO
    //Erweitern, dass Funktion alle je erzeugten IDS speichert 
    //und neue mit den bisher erzeugten vergleicht um keine doppelt zu vergeben, 
    //auch wenn dies bei der Größe der Id unwahrscheinlich ist.

return id;
}
//taskFunctions


/** create task-Object with given parameters, automatically add an ID and push it to the tasks-Array
 * the store it in the remoteStorage.
 * 
 * @param {String} title 
 * @param {String} descripton 
 * @param {Array} assignedTo 
 * @param {Date} dueDate 
 * @param {String} priority 
 * @param {String} category 
 * @param {Array} subtasks 
 */
function createTask(title, description, assignedTo, dueDate, priority, category, subtasks){
        let task= {
            taskID: createID(),
            title: title,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            priority: priority,
            category: category,
            subtasks: subtasks
        }

        tasks.push(task);
        storeTasks();
}


/**returns a Task-Object with a given ID from the Tasks-Array. If not found returns null 
 * and logs a warning.
 * 
 * @param {String} id 
 * @returns {Object}
 */
function getTaskFromID(id){
    
    for(let i =0 ; i < tasks.length; i++){
        if (tasks[i].taskID == id){
            return tasks[i];
        }
    }
    console.warn("Task with given ID not found in Tasks");
    return null;

}

/**
 * returns Index of Task with given ID in array tasks, returns -1 if not found
 * @param {String} id 
 * @returns {Number}
 */
function getIndexOfTasksById(id){
    for (let i = 0; tasks.length; i++){
        if (tasks[i].taskID==id){
            return i;
        } else {return -1}
    }
}

/**Saves the actualTask after Editing at the same position in the tasks Array
 * it originated from. Thus preventing adding tasks with the same ID throuh
 * editing.
 * 
 * @param {String} id 
 */
function saveActualTask(id){
    
    let index =getIndexOfTasksById(id);
    if (index > -1){
        tasks.splice(index,1,actualTask)
    } else {console.error("ActualTask wurde nicht im Arrays Tasks gefunden");}
    
    
}


//actualTask- function

/**
 * With an given ID the Task with that ID is loaded from the TasksArray into
 * the ActualTask, ready to get the data or set data to edit it.
 * @param {String} id 
 */
function setAsActualTask(id){
    actualTask = getTaskFromID(id);
}






//get-functions um Werte der actualTask abzurufen
function getTitleOfActual(){
    return actualTask.title;
}

function getDescriptionOfActual(){
    return actualTask.description;
}

function getAssignedTo(){
    return actualTask.getAssignedTo;
}

function getDueDate(){
    return actualTask.dueDate;
}

function getPriority(){
    return actualTask.priority;
}

function getCategory(){
    return actualTask.priority;
}

function getSubtasks(){
    return actualTask.subtasks;
}

//set-functions to manipulate datapoints in actualTask

function setTitle(newTitle){
    actualTask.title=newTitle;
}
//weiter fortführen



//contactFunctions

/**
 * returns the initials as a String from a given name consisting of multiple first names and surnames
 * @param {String} name 
 * @returns {String}
 */
function getInitials(name){
    let splitName = name.split(" ");
    let firstInitial = splitName[0][0];
    let lastInitial = splitName[splitName.length -1][0];
    return firstInitial+lastInitial;
}


/**
 * returns the Contact-Object with the given ID from the contactsArray, 
 * if not found returns null and logs warning
 * @param {String} id 
 * @returns {Object}
 */
function getContactFromID(id){
    
    for(let i =0 ; i < contacts.length; i++){
        if (contacts[i].contactID == id){
            return contacts[i];
        }
    }
    console.warn("Contact with given ID not found in contatcs");
    return null;
}

    




/**
 * creates a contact with given parameters and pushes it to the contactsArray
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 */
function createContact(name, email, phone){
    let contact = {
        contactID: createID(),
        name: name,
        email: email,
        phone: phone,
        initials: getInitials(name)


    }

    contacts.push(contact);
    storeContacts();
}



//user Functions

//TODO User Funktionen erstellen



//********************
//Structure of JSON 
//********************

//Task
let task = {
    taskID: {String},
    title: {String},
    description: {String},
    assignedTo: [
                {contactID: {String}}, 
                {contactID: {String}}
    ],
    dueDate: {Date},
    priority: {String},
    category: {String},
    subtasks:[
                {
                taskname:{String}, 
                done:    {Boolean}
                }, 
                {
                taskname: {String}, 
                done: {Boolean}
                } 
    ]

}

//Subtask
let subtask = {
                taskname: {String}, 
                done: {Boolean} 
}



//Contacts

let contact = {
    contactID: {String},
    name: {String},
    email: {String},
    phone: {String},
    initials:{String}

}


//User

let user = {
    userID: {String},
    email: {String},
    password: {String},
    name: {String}

}