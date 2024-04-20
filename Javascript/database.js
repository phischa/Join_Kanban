const STORAGE_TOKEN =
  "pEi5FKcwpcQR2iv30dQpE9dkrGpKeizYWMbvw5JVF4vmEfGoRr6pXJxUgCtmfHIs";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let tasks = [];
let currentTaskId = [];
let actualTask;
// Wenn eine Aufgabe angesehen wird, sollte sie hier "actualTask" hinein
//geladen werden. dies geschieht mit setAsActualTask(id)
//Nach der Editierung ihrer Bestandteile muss die actualTask
//dann ins tasksArray an die Position gespeichert werden, von der sie genommen wurde.
//Das geschieht mit saveActualTask()

let contacts = [];
let actualContact;

let users = [];
let actualUser = "Standarduser";

let subtasksOfActualTask = [];
let actualSubtask;

//Functions

/** generates unique ID from random Numbers
 *
 * @yields {string}
 */
function createID() {
  let id = "";
  let numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvxyz";

  for (let i = 0; i < 16; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
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
function createTask(
  title,
  description,
  assignedTo,
  dueDate,
  priority,
  category,
  subtasks
) {

  let task = {
    taskID: "",
    title: title,
    description: description,
    assignedTo: assignedTo,
    dueDate: dueDate,
    priority: priority,
    category: category,
    subtasks: subtasks,
    currentProgress: currentColumn,
  };
  task["taskID"] = currentTaskId = createID();
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

/**
 *  function deletes a task from the tasks-Aray given its ID
 * @param {String} id
 */
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
  } else {
    console.error("ActualTask wurde nicht im Arrays Tasks gefunden");
  }
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

/**
 * functions creates a subtask out of given content and returns the so created
 * subtask
 * @param {String} content
 * @returns {Object} Subtask JSON Object
 */
function createSubtask(content) {
  let subTask = {
    subTaskID: createID(),
    subTaskName: content,
    done: false,
  };

  return subTask;
}

/**
 * create a Subtask for a task stored in ActualTask.
 * The subtask is added to the subtasks of the task
 * in actualTask.
 */
function addSubtask(content) {
  let subTask = {
    subTaskID: createID(),
    subTaskName: content,
    done: false,
  };

  subtasksOfActualTask.push(subTask);
}

/**
 * function finds the subtask of the task in actualTask by ID
 * and deltes it.
 * @param {String} id
 */
function deleteSubtask(id) {
  index = getIndexOfSubtasksById(id);
  subtasksOfActualTask.splice(index, 1);
}

/**
 * function searches with ID for the according subtask
 * of the task stores in actualTask and then loads in in actualSubtask
 * @param {String} id
 */
function getSubtaskByID(id) {
  index = getIndexOfSubtasksById(id);
  actualSubtask = subtasksOfActualTask[index];
}

/**
 * function saves the subtask in actualSubtask to the Task
 * in actualTask.
 * @param {String} id
 */
function saveSubtask(id) {
  index = getIndexOfSubtasksById(id);
  subtasksOfActualTask.splice(index, 1, actualSubtask);
}

/**
 *
 */
//after subtask is loaded in actualSubtask
function toggleDoneOfActualSubtask() {
  actualSubtask.done = !actualSubtask.done;
}

/**
 * the function look for a subtask in the Task stores in ActualTask
 * with an given ID and returns its index or -1 if not found.
 * @param {String} id
 * @returns {number}
 */
function getIndexOfSubtasksById(id) {
  for (let i = 0; i < subtasksOfActualTask.length; i++) {
    if (subtasksOfActualTask[i].subTaskID == id) {
      return i;
    }
  }
  return -1;
}

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
async function createContact(name, email, phone) {
  let contact = {
    contactID: createID(),
    name: name,
    email: email,
    phone: phone,
    initials: getInitials(name),
    color: createContactColor(),
  };

  contacts.push(contact);
  await storeContacts();
}

/**
 * function creates a random color. Used in creating contacts.
 * @returns {String} colorhexCode
 */
function createContactColor() {
  let color;
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  color =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");
  return color;
}

/**
 * function is given a canvas, a text and a color. It then draws on given Canvas a circle
 * with the given color and puts the Text (Initials of a Contact) into it.
 * @param {String} colorCode
 * @param {String} text
 * @param {String} canvasID
 */
function drawColoredCircle(colorCode, text, canvasID) {
  let canvas = document.getElementById(canvasID);
  let ctx = canvas.getContext("2d");
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let radius = canvas.height / 2 - 2;

  ctx.imageSmoothingEnabled = false;
  ctx.imageSmoothingQuality = "high";

  // Circle Background
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = colorCode;
  ctx.fill();

  // Brightness
  let brightness = calculateBrightness(colorCode);

  // TExtcolor white or black depending on britghntess of color
  let textColor = brightness > 128 ? "#000000" : "#ffffff";

  // text specifications
  ctx.font = "1rem Inter";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // finally drawing the circle
  ctx.fillText(text, centerX, centerY);
}

/**
 * function calculates Brightness of a given color.
 *
 * @param {String} hexColor
 * @returns {number} - brightness
 */
function calculateBrightness(hexColor) {
  //get rgb values
  let r = parseInt(hexColor.substring(1, 3), 16);
  let g = parseInt(hexColor.substring(3, 5), 16);
  let b = parseInt(hexColor.substring(5, 7), 16);
  // calculate brightness
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness;
}

/**
 * functions deletes a contact with a specific id out of the contacts-Array 
 */
async function deleteContact(idToRemove) {
  let check = checkContactIfUser(idToRemove);
  let indexToRemove = contacts.findIndex(contacts => contacts.contactID === idToRemove);

  if (check) {
  if (indexToRemove !== -1) {
    contacts.splice(indexToRemove, 1);
    await storeContacts();
    }
  }
}

/**
 * function searches for a contact with a given id in the contacts-Array
 * and returns the index or -1 if not found.
 * @param {String} id 
 * @returns {number}
 */
function getIndexOfContactById(id) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].contactID == id) {
      return i;
    }
  }
  return -1;
}

/**
 * function checks if a contact is a user and returns the boolean.
 * @param {String} id 
 * @returns {boolean}
 */
function checkContactIfUser(id) {
  for (let i = 0; i < contacts.length; i++) {
    if ((contacts[i].userID = id)) {
      return true;
    }
  }
  return false;
}

//user Functions

/**
 * function creates a user, creates also a contact for the user and the stores
 * the user in the storage.
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {String} username 
 */
async function createUser(email, password, username) {
  let user = {
    userID: createID(),
    email: email,
    password: password,
    name: username,
  };
  users.push(user);
  await storeUser();
  createUserContact(user);
}

/**
 * function is given a user-Object and it creates a contact-Object with the same ID 
 * in the contacts array and then stores in the storage
 * @param {Object} user 
 */
async function createUserContact(user) {
  let contact = {
    contactID: user.userID,
    name: user.name,
    email: user.email,
    initials: getInitials(user.name),
    color: createContactColor(),
  };

  contacts.push(contact);
  await storeContacts();
}

/**
 * function gets the initials of the name of the user which is logged in and gives them to the next function.
 *
 */
async function initialsOf() {
  if (actualUser && actualUser["name"]) {
    let words = actualUser["name"].split(" ");
    let initials = "";
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      initials += word.charAt(0).toUpperCase();
    }
    addInitialsToHeader(initials);
  } else {
    addLetterGToHeader();
  }
}
/**
 * function inserts the initials into the div with the id='initialname'
 *
 * @param {string} initials
 */
function addInitialsToHeader(initials) {
  let insert = document.getElementById("initialname");
  insert.innerHTML = "";
  insert.innerHTML = `${initials}`;
}

/**
 * function adds letter G for guest into the div with the id='initialname'
 */
function addLetterGToHeader() {
  let insert = document.getElementById("initialname");
  insert.innerHTML = "";
  insert.innerHTML = "G";
}

//********************
//Structure of JSON
//********************

//Task
let task = {
  taskID: { String },
  title: { String },
  description: { String },
  assignedTo: [{ contactID: { String } }, { contactID: { String } }],
  dueDate: { Date },
  priority: { String },
  category: { String },

  subtasks: [
    {
      subTaskID: { String },
      subTaskName: { String },
      done: { Boolean },
    },
    {
      subTaskID: { String },
      subTaskName: { String },
      done: { Boolean },
    },
  ],
  currentProgress: { Number },
};

//Subtask
let subtask = {
  subTaskID: { String },
  subTaskName: { String },
  done: { Boolean },
};

//Contacts

let contact = {
  contactID: { String },
  name: { String },
  email: { String },
  phone: { String },
  initials: { String },
  color: { String },
};

//User

let user = {
  userID: { String },
  email: { String },
  password: { String },
  name: { String },
};
