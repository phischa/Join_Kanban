
//Storage Functions from Developer Akademie

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}


//Delete-Function

function deleteStoredTasks(){
    setItem('tasks', "null");
}

function deleteStoredUsers(){
    setItem('users', "null");
}

function deleteStoredContacts(){
    setItem('contacts', "null");
}




//Store-Functions

function storeTasks(){
    tasksAsText = JSON.stringify(tasks);
    setItem('tasks', tasksAsText); 
}

function storeContacts(){
    contactsAsText = JSON.stringify(contacts);
    setItem('contacts', contactsAsText);
}

function storeUser(){
    //neu angelegter User muss gespeichert werden
}


//Load-Functions

async function loadTasks(){
    let loadedTasks = [];
    loadedTasks = await getItem('tasks'); 
    if (loadedTasks.data && loadedTasks.data.value && loadedTasks.data.value!="null"){
        tasks = JSON.parse(loadedTasks.data.value);
    } else {console.warn("RemoteStorage hat keine Tasks gespeichert.")}
}

async function loadContacts(){
    let loadedContacts = [];
    loadedContacts = await getItem('contacts');
    
    if (loadedContacts.data && loadedContacts.data.value && loadedContacts.data.value!="null"){
        contacts = JSON.parse(loadedContacts.data.value);
    } else {console.warn("RemoteStorage hat keine Kontakte gespeichert.")}
    
}

async function loadUsers(){
    let loadedUsers = [];
    loadedUsers = await getItem('users');
    
    if (loadedUsers.data && loadedUsers.data.value && loadedUsers.data.value!="null"){
        users = JSON.parse(loadedUsers.data.value);
    } else {console.warn("RemoteStorage hat keine User gespeichert.")}
}