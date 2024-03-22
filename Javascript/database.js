const STORAGE_TOKEN = "pEi5FKcwpcQR2iv30dQpE9dkrGpKeizYWMbvw5JVF4vmEfGoRr6pXJxUgCtmfHIs";
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


let tasks=[];
let actualTask;

let contacts=[];
let actualContact;

let users=[];
let actualUser;


//Structure of JSON 


//Task
let task = {
    taskID: {Number},
    title: {String},
    description: {String},
    assignedTo: [
                {contactID: {Number}}, 
                {contactID: {Number}}
    ],
    dueDate: {Date},
    priority: {String},
    category: {String},
    subtasks:[
                {String}, {String} 
    ]

}

//Contacts

let contact = {
    contactID: {Number},
    name: {String},
    email: {String},
    phone: {String},
    initials:{String}

}


//User

let user = {
    userID: {Number},
    email: {String},
    password: {String},
    name: {String}

}