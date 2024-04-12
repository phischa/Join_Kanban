const STORAGE_TOKEN = "pEi5FKcwpcQR2iv30dQpE9dkrGpKeizYWMbvw5JVF4vmEfGoRr6pXJxUgCtmfHIs";
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let tasks = [];
let actualTask;
// Wenn eine Aufgabe angesehen wird, sollte sie hier "actualTask" hinein 
//geladen werden. dies geschieht mit setAsActualTask(id)
//Nach der Editierung ihrer Bestandteile muss die actualTask
//dann ins tasksArray an die Position gespeichert werden, von der sie genommen wurde.
//Das geschieht mit saveActualTask()

let contacts = [];
let actualContact;

let users = []
let actualUser = 'Standarduser';

let subtasksOfActualTask = [];
let actualSubtask;


//Functions

/** generates unique ID from random Numbers
 * 
 * @yields {string}
 */
function createID() {
    let id = "";
    let numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 0; i < 16; i++) {
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
 * then store it in the remoteStorage.
 * 
 * @param {String} title 
 * @param {String} description 
 * @param {Array} assignedTo 
 * @param {Date} dueDate 
 * @param {String} priority 
 * @param {String} category 
 * @param {Array} subtasks 
 * @param {Number} currentProgress
 */
function createTask(title, description, assignedTo, dueDate, priority, category, subtasks) {
    let task = {
        taskID: createID(),
        title: title,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        priority: priority,
        category: category,
        subtasks: subtasks,
        currentProgress: 0
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
function getTaskFromID(id) {

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskID == id) {
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
function getIndexOfTasksById(id) {

    for (let i = 0; i < tasks.length; i++) {


        if (tasks[i].taskID == id) {
            return i;
        }
    }
    return -1;
}
function deleteTask(id) {
    let index = getIndexOfTasksById(id);
    tasks.splice(index, 1);
}


//actualTask- functions


/**Saves the actualTask after Editing at the same position in the tasks Array
 * it originated from. This preventing adding tasks with the same ID throuh
 * editing.
 * 
 * @param {String} id 
 */
function saveActualTask() {
    let id = actualTask.taskID;
    actualTask.subtasks = subtasksOfActualTask;
    let index = getIndexOfTasksById(id);

    if (index > -1) {

        tasks.splice(index, 1, actualTask);
    } else { console.error("ActualTask wurde nicht im Arrays Tasks gefunden"); }


}




/**
 * With an given ID the Task with that ID is loaded from the TasksArray into
 * the ActualTask, ready to get the data or set data to edit it.
 * @param {String} id 
 */
function setAsActualTask(id) {
    actualTask = getTaskFromID(id);
    subtasksOfActualTask = actualTask.subtasks;
}





//subTask Functions

//when creating a subtask and need it returned
function createSubtask(content) {
    let subTask = {
        subTaskID: createID(),
        subTaskName: content,
        done: false
    }

    return subTask;
}

//when editing a task and the task is stored in ActualTask
function addSubtask(content) {
    let subTask = {
        subTaskID: createID(),
        subTaskName: content,
        done: false
    }

    subtasksOfActualTask.push(subTask);
}

function deleteSubtask(id) {
    index = getIndexOfSubtasksById(id);
    subtasksOfActualTask.splice(index, 1);
    //?  actualSubtask= null;
}

function getSubtaskByID(id) {
    index = getIndexOfSubtasksById(id);
    actualSubtask = subtasksOfActualTask[index];
}

function saveSubtask(id) {
    index = getIndexOfSubtasksById(id);
    subtasksOfActualTask.splice(index, 1, actualSubtask);

}

//after subtask is loaded in actualSubtask
function toggleDoneOfActualSubtask() {
    actualSubtask.done = !actualSubtask.done;
}

function getIndexOfSubtasksById(id) {
    for (let i = 0; i < subtasksOfActualTask.length; i++) {
        if (subtasksOfActualTask[i].subTaskID == id) {
            return i;
        }
    }
    return -1;
}


//TO DO: SubTask functions erstellen


//contactFunctions

/**
 * returns the initials as a String from a given name consisting of multiple first names and surnames
 * @param {String} name 
 * @returns {String}
 */
function getInitials(name) {
    let splitName = name.split(" ");
    let firstInitial = splitName[0][0];
    let lastInitial = splitName[splitName.length - 1][0];
    return firstInitial + lastInitial;
}


/**
 * returns the Contact-Object with the given ID from the contactsArray, 
 * if not found returns null and logs warning
 * @param {String} id 
 * @returns {Object}
 */
function getContactFromID(id) {

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].contactID == id) {
            return contacts[i];
        }
    }
    console.warn("Contact with given ID not found in contacts");
    return null;
}






/**
 * creates a contact with given parameters and pushes it to the contactsArray
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 */
function createContact(name, email, phone) {
    let contact = {
        contactID: createID(),
        name: name,
        email: email,
        phone: phone,
        initials: getInitials(name),
        color: createContactColor()
    }

    contacts.push(contact);
    storeContacts();
}


function createContactColor() {
    let color;
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color = "#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    return color;
}


function drawColoredCircle(colorCode, text, canvasID) {
    let canvas = document.getElementById(canvasID); //Canvas noch genauer betrachten


    let ctx = canvas.getContext("2d");
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = (canvas.height / 2) - 2; //Größe noch anpassen

    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';


    // Hintergrundfarbe des Kreises
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = colorCode;
    ctx.fill();

    // Bestimme die Helligkeit der Hintergrundfarbe
    let brightness = calculateBrightness(colorCode);

    // Bestimme die Farbe für den Text (weiß oder schwarz)
    let textColor = (brightness > 128) ? "#000000" : "#ffffff";

    // Setze die Texteigenschaften
    ctx.font = "1rem Inter";
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Zeichne den Text in den Kreis
    ctx.fillText(text, centerX, centerY);
}

function calculateBrightness(hexColor) {
    // Konvertiere den Hexadezimalfarbcode in RGB-Werte
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    // Berechne die Helligkeit nach der Formel YIQ
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness;
}


function deleteContact(id) {
    let check = checkContactIfUser(id);

    if (check) {
        index = getIndexOfContactById(id);
        if (index > -1) {
            contacts[index].splice(index, 1);
        }
    }
}


function getIndexOfContactById(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].contactID == id) {
            return i;
        }
    }
    return -1;
}

function checkContactIfUser(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].userID = id) {
            return true;
        }
    }
    return false;
}

//user Functions
async function createUser(email, password, username) {
    let user = {
        userID: createID(),
        email: email,
        password: password,
        name: username
    }
    users.push(user);
    await storeUser();
    createUserContact(user);
}

async function createUserContact(user) {

    let contact = {
        contactID: user.userID,
        name: user.name,
        email: user.email,
        initials: getInitials(user.name),
        color: createContactColor()
    }

    contacts.push(contact);
    await storeContacts();
}

/**
 * function gets the initials of the name of the user which is logged in and gives them to the next function.
 * 
 */
async function initialsOf() {
    let words = actualUser['name'].split(' ');
    let initials = '';
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        initials += word.charAt(0).toUpperCase();
    }
    addInitialsToHeader(initials);
}

/**
* function inserts the initials into the div wie the id='initialname'
* 
* @param {string} initials 
*/
function addInitialsToHeader(initials) {
    let insert = document.getElementById('initialname');
    insert.innerHTML = "";
    insert.innerHTML = `${initials}`;
}










//********************
//Structure of JSON 
//********************

//Task
let task = {
    taskID: { String },
    title: { String },
    description: { String },
    assignedTo: [
        { contactID: { String } },
        { contactID: { String } }
    ],
    dueDate: { Date },
    priority: { String },
    category: { String },

    subtasks: [
        {
            subTaskID: { String },
            subTaskName: { String },
            done: { Boolean }
        },
        {
            subTaskID: { String },
            subTaskName: { String },
            done: { Boolean }
        }
    ],
    currentProgress: { Number }

}

//Subtask
let subtask = {
    subTaskID: { String },
    subTaskName: { String },
    done: { Boolean }
}



//Contacts

let contact = {
    contactID: { String },
    name: { String },
    email: { String },
    phone: { String },
    initials: { String },
    color: { String }

}


//User

let user = {
    userID: { String },
    email: { String },
    password: { String },
    name: { String }

}