// Global variables
let tasks = [];
let currentTaskId = [];
let actualTask;
let contacts = [];
let actualContact;
let users = [];
let actualUser = "Standarduser";
let subtasksOfActualTask = [];
let actualSubtask;

//********************
// Functions to work with tasks
//********************

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
function createID() {
    let id = "";
    let numbers = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvxyz";
    for (let i = 0; i < 16; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return id;
}

/**
 * Create a task with the given parameters and store it
 * @param {String} title - Task title
 * @param {String} description - Task description
 * @param {Array} assignedTo - Array of contact IDs
 * @param {Date} dueDate - Due date
 * @param {String} priority - Task priority
 * @param {String} category - Task category
 * @param {Array} subtasks - Array of subtask objects
 */
async function createTask(title, description, assignedTo, dueDate, priority, category, subtasks, currentColumn = 0) {
    // Format the task data exactly as Django expects it
    let task = {
        title: title,
        description: description,
        
        // Make sure assignedTo is an array of objects with contactID property
        assignedTo: Array.isArray(assignedTo) ? assignedTo.map(contact => {
            if (typeof contact === 'object') {
                // If it already has contactID, use it
                if (contact.contactID) {
                    return { contactID: contact.contactID };
                }
                // If it has an id but no contactID, use id as contactID
                if (contact.id) {
                    return { contactID: contact.id };
                }
            }
            // If it's just a primitive value (like a string or number), use as contactID
            return { contactID: contact };
        }) : [],
        
        // Format date properly
        dueDate: dueDate,
        
        // Make sure priority is one of the accepted values
        priority: ["low", "medium", "high"].includes(priority) ? priority : "medium",
        
        // Make sure category is one of the accepted values
        category: ["todo", "inprogress", "done"].includes(category) ? category : "todo",
        
        // Format subtasks with the field Django expects (subTaskName)
        subtasks: Array.isArray(subtasks) ? subtasks.map(subtask => {
            return {
                // Keep/add subTaskName as that's what the serializer expects
                subTaskName: subtask.subTaskName || subtask.name || "",
                // Include a 'done' flag
                done: Boolean(subtask.done)
            };
        }) : [],
        
        // Current progress as a number
        currentProgress: Number(currentColumn),
        
        // Add user reference if possible
        user: users.length > 0 ? { userID: users[0].userID } : null
    };
    
    // Send to backend and get the ID back
    const response = await storeTask(task);
    
    if (response.status === "success") {
        // If backend returns a taskID, use it
        if (response.taskID) {
            task.taskID = response.taskID;
            currentTaskId = response.taskID;
        } else {
            // Otherwise create a local ID
            task.taskID = createID();
            currentTaskId = task.taskID;
        }
        
        tasks.push(task);
        return task;
    } else {
        // Fallback to local storage if API fails
        task.taskID = currentTaskId = createID();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return task;
    }
}

/**
 * Get a task by ID
 * @param {String} id - Task ID
 * @returns {Object|null} Task object or null if not found
 */
function getTaskFromID(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskID == id) {
            return tasks[i];
        }
    }
    console.warn(`Task with ID ${id} not found`);
    return null;
}

/**
 * Get the index of a task by ID
 * @param {String} id - Task ID
 * @returns {Number} Index in the tasks array or -1 if not found
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
 * Delete a task by ID
 * @param {String} id - Task ID
 */
async function deleteTask(id) {
    let index = getIndexOfTasksById(id);
    if (index !== -1) {
        // Remove from local array
        tasks.splice(index, 1);
        
        // Delete from backend
        try {
            const response = await deleteTaskItem(id);
            if (response.status !== "success") {
                console.error("Failed to delete task from backend:", response);
                // Fallback to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            // Fallback to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

/**
 * Save the current task being edited
 */
async function saveActualTask() {
    if (!actualTask) return;
    
    let id = actualTask.taskID;
    actualTask.subtasks = subtasksOfActualTask;
    let index = getIndexOfTasksById(id);
    
    if (index > -1) {
        // Update local array
        tasks.splice(index, 1, actualTask);
        
        console.log("Saving task to backend:", actualTask);
        
        // Format the subtasks correctly for the backend
        let formattedTask = { ...actualTask };
        if (formattedTask.subtasks && Array.isArray(formattedTask.subtasks)) {
            formattedTask.subtasks = formattedTask.subtasks.map(subtask => {
                return {
                    // Always include subTaskName as that's what the serializer expects
                    subTaskName: subtask.subTaskName || subtask.name || "",
                    // Include the id if present for existing subtasks
                    ...(subtask.subTaskID && { subTaskID: subtask.subTaskID }),
                    // Include the done status
                    done: Boolean(subtask.done)
                };
            });
        }
        
        // Update in backend
        try {
            const response = await storeTask(formattedTask);
            if (response.status !== "success") {
                console.error("Failed to update task in backend:", response);
                // Fallback to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {
                console.log("Task saved successfully:", response);
            }
        } catch (error) {
            console.error("Error updating task:", error);
            // Fallback to local storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

/**
 * Set a task as the current task for editing
 * @param {String} id - Task ID
 */
function setAsActualTask(id) {
    actualTask = getTaskFromID(id);
    if (actualTask) {
        subtasksOfActualTask = actualTask.subtasks || [];
    } else {
        subtasksOfActualTask = [];
    }
}

//********************
// Functions to work with subtasks
//********************

/**
 * Create a subtask object
 * @param {String} content - Subtask name
 * @returns {Object} Subtask object
 */
function createSubtask(content) {
    // Create subtask in a format that works with Django's serializer
    // Django serializer expects 'name' field but our frontend uses 'subTaskName'
    let subTask = {
        subTaskID: createID(),
        subTaskName: content,  // Keep for frontend compatibility
        name: content,         // Add this for Django compatibility
        done: false,
    };
    return subTask;
}

/**
 * Add a subtask to the current task
 * @param {String} content - Subtask name
 */
function addSubtask(content) {
    let subTask = createSubtask(content);
    subtasksOfActualTask.push(subTask);
}

/**
 * Delete a subtask by ID
 * @param {String} id - Subtask ID
 */
function deleteSubtask(id) {
    let index = getIndexOfSubtasksById(id);
    if (index !== -1) {
        subtasksOfActualTask.splice(index, 1);
    }
}

/**
 * Get a subtask by ID and set it as the current subtask
 * @param {String} id - Subtask ID
 */
function getSubtaskByID(id) {
    let index = getIndexOfSubtasksById(id);
    if (index !== -1) {
        actualSubtask = subtasksOfActualTask[index];
    }
}

/**
 * Save changes to the current subtask
 * @param {String} id - Subtask ID
 */
function saveSubtask(id) {
    if (!actualSubtask) return;
    
    let index = getIndexOfSubtasksById(id);
    if (index !== -1) {
        subtasksOfActualTask.splice(index, 1, actualSubtask);
    }
}

/**
 * Toggle the done status of the current subtask
 */
function toggleDoneOfActualSubtask() {
    if (!actualSubtask) return;
    actualSubtask.done = !actualSubtask.done;
}

/**
 * Get the index of a subtask by ID
 * @param {String} id - Subtask ID
 * @returns {Number} Index or -1 if not found
 */
function getIndexOfSubtasksById(id) {
    for (let i = 0; i < subtasksOfActualTask.length; i++) {
        if (subtasksOfActualTask[i].subTaskID == id) {
            return i;
        }
    }
    return -1;
}

//********************
// Functions to work with contacts
//********************

/**
 * Get initials from a name
 * @param {String} name - Full name
 * @returns {String} Initials
 */
function getInitials(name) {
    let splitName = name.split(" ");
    if (splitName.length < 2) return splitName[0][0].toUpperCase();
    
    let firstInitial = splitName[0][0].toUpperCase();
    let lastInitial = splitName[splitName.length - 1][0].toUpperCase();
    return firstInitial + lastInitial;
}

/**
 * Get a contact by ID
 * @param {String} id - Contact ID
 * @returns {Object|null} Contact object or null if not found
 */
function getContactFromID(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].contactID == id) {
            return contacts[i];
        }
    }
    console.warn(`Contact with ID ${id} not found`);
    return null;
}

/**
 * Create a random color for a contact
 * @returns {String} Hex color code
 */
function createContactColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Create a contact and store it
 * @param {String} name - Contact name
 * @param {String} email - Contact email
 * @param {String} phone - Contact phone number
 */
async function createContact(name, email, phone) {
    let contact = {
        name: name,
        email: email,
        phone: phone,
        color: createContactColor(),
    };
    
    // Send to backend and get the ID back
    const response = await storeContact(contact);
    
    if (response.status === "success") {
        // If backend returns a contactID, use it
        if (response.contactID) {
            contact.contactID = response.contactID;
        } else {
            // Otherwise create a local ID
            contact.contactID = createID();
        }
        
        // Add initials - this is done on the server side in Django but we'll add it here too
        contact.initials = getInitials(name);
        
        contacts.push(contact);
    } else {
        // Fallback to local storage if API fails
        contact.contactID = createID();
        contact.initials = getInitials(name);
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

/**
 * Normalize an ID to a number if it's numeric
 * @param {String|Number} id - The ID to normalize
 * @returns {String|Number} - Normalized ID
 */
function normalizeId(id) {
    return !isNaN(id) ? Number(id) : id;
}

/**
 * Find the index of a contact by ID
 * @param {String|Number} id - Contact ID to find
 * @returns {Number} Index in the contacts array or -1 if not found
 */
function findContactIndexById(id) {
    const normalizedId = normalizeId(id);
    return contacts.findIndex(contact => 
        contact.contactID === normalizedId || contact.id === normalizedId
    );
}

/**
 * Check if a contact is also a user
 * @param {String|Number} id - Contact ID
 * @returns {Boolean} True if the contact is associated with a user
 */
function checkContactIfUser(id) {
    const normalizedId = normalizeId(id);
    return users.some(user => 
        user.userID === normalizedId || user.id === normalizedId
    );
}

/**
 * Remove a contact from local storage
 * @param {Number} index - Index of the contact in the contacts array
 * @returns {Object} The removed contact
 */
function removeContactLocally(index) {
    const contactToRemove = contacts[index];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return contactToRemove;
}

/**
 * Delete a contact from the backend
 * @param {Object} contact - The contact to delete
 * @returns {Promise<Object>} Response from the server
 */
async function removeContactFromBackend(contact) {
    // Use the database id if available, otherwise use contactID
    const backendId = contact.id || contact.contactID;
    
    try {
        return await deleteContactItem(backendId);
    } catch (error) {
        console.error("Error deleting contact from backend:", error);
        return { status: "error", message: error.message };
    }
}

/**
 * Main function to delete a contact by ID
 * @param {String|Number} idToRemove - Contact ID
 */
async function deleteContact(idToRemove) {
    // Find contact in the array
    const indexToRemove = findContactIndexById(idToRemove);
    
    if (indexToRemove === -1) {
        console.warn(`Contact with ID ${idToRemove} not found`);
        return;
    }
    
    // Check if contact is a user
    if (checkContactIfUser(idToRemove)) {
        console.warn("Cannot delete a contact associated with a user account");
        return;
    }
    
    // Remove locally first
    const contactToRemove = removeContactLocally(indexToRemove);
    
    // Then remove from backend
    const response = await removeContactFromBackend(contactToRemove);
    
    if (response.status !== "success") {
        console.error("Failed to delete contact from backend:", response);
    }
}

/**
 * Get the index of a contact by ID
 * @param {String} id - Contact ID
 * @returns {Number} Index or -1 if not found
 */
function getIndexOfContactById(id) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].contactID == id) {
            return i;
        }
    }
    return -1;
}



//********************
// Functions to work with users
//********************

/**
 * Create a user and corresponding contact
 * @param {String} email - User email
 * @param {String} password - User password
 * @param {String} username - Username
 */
async function createUser(email, password, username) {
    let user = {
        email: email,
        password: password,
        name: capitalizeName(username),
    };
    
    // Send to backend and get the ID back
    const response = await storeUser(user);
    
    if (response.status === "success") {
        // If backend returns a userID, use it
        if (response.userID) {
            user.userID = response.userID;
        } else {
            // Otherwise create a local ID
            user.userID = createID();
        }
        
        // Create a contact for this user
        await createUserContact(user);
        
        users.push(user);
    } else {
        // Fallback to local storage if API fails
        user.userID = createID();
        users.push(user);
        createUserContact(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

/**
 * Create a contact for a user
 * @param {Object} user - User object
 */
async function createUserContact(user) {
    let contact = {
        contactID: user.userID,
        name: user.name,
        email: user.email,
        initials: getInitials(user.name),
        color: createContactColor(),
    };
    
    // Store in the backend
    await storeContact(contact);
    
    contacts.push(contact);
}

/**
 * Capitalize a name
 * @param {String} name - Name to capitalize
 * @returns {String} Capitalized name
 */
function capitalizeName(name) {
    return name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Delete all contacts
 */
async function deletedAllContacts() {
    // NOTE: This is a destructive operation that would require multiple API calls
    // Implement with caution - you'd need to delete each contact individually from the backend
    console.warn("deletedAllContacts: This operation requires multiple API calls and is not fully implemented.");
    
    // Clear local array
    contacts.length = 0;
    
    // Fallback to local storage for now
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

/**
 * Logout the current user
 */
function logout() {
    localStorage.setItem('rememberMe', '');
    localStorage.removeItem('rememberedEmail');
    localStorage.removeItem('rememberedPassword');
    deleteActualUser();
    window.location.href = "./start.html";
}

//********************
// Storage functions (API + fallback)
//********************

/**
 * Store all tasks to backend
 */
async function storeTasks() {
    try {
        if (tasks.length === 0) {
            console.warn("No tasks to store");
            return;
        }
        
        for (let task of tasks) {
            await storeTask(task);
        }
    } catch (error) {
        console.error("Failed to store tasks:", error);
        // Fallback: Store locally
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

/**
 * Store all contacts to backend
 */
async function storeContacts() {
    try {
        if (contacts.length === 0) {
            console.warn("No contacts to store");
            return;
        }
        
        for (let contact of contacts) {
            await storeContact(contact);
        }
    } catch (error) {
        console.error("Failed to store contacts:", error);
        // Fallback: Store locally
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

/**
 * Store users to backend
 */
async function storeUser() {
    try {
        if (users.length === 0) {
            console.warn("No users to store");
            return;
        }
        
        const response = await storeUsersToBackend(users);
        if (response.status !== "success") {
            console.error("Error storing users:", response);
            // Fallback: Store locally
            localStorage.setItem('users', JSON.stringify(users));
        }
    } catch (error) {
        console.error("Failed to store users:", error);
        // Fallback: Store locally
        localStorage.setItem('users', JSON.stringify(users));
    }
}

/**
 * Store the current user in local storage
 */
async function storeActualUser() {
    // This uses localStorage only
    localStorage.setItem('actualUser', JSON.stringify(actualUser));
}

/**
 * Store remember me setting in local storage
 */
async function storeRememberMe() {
    // This uses localStorage only
    if (typeof rememberMe !== 'undefined') {
        localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    }
}

/**
 * Load all tasks from backend
 */
async function loadTasks() {
    try {
        const loadedTasks = await loadAllTasks();
        if (Array.isArray(loadedTasks)) {
            // Map backend task format to our format if needed
            tasks = loadedTasks.map(task => {
                // If the backend returns taskID and our code expects taskID, no mapping needed
                return task;
            });
        } else {
            console.error("Invalid tasks data:", loadedTasks);
            // Try to load from localStorage as fallback
            const localTasks = localStorage.getItem('tasks');
            if (localTasks) {
                tasks = JSON.parse(localTasks);
            }
        }
    } catch (error) {
        console.error("Failed to load tasks:", error);
        // Try to load from localStorage as fallback
        const localTasks = localStorage.getItem('tasks');
        if (localTasks) {
            tasks = JSON.parse(localTasks);
        }
    }
}

/**
 * Process contacts from the backend
 * @param {Array} loadedContacts - Contacts loaded from backend
 * @returns {Array} Processed contacts with consistent IDs
 */
function processLoadedContacts(loadedContacts) {
    return loadedContacts.map(contact => ({
        ...contact,
        id: contact.id || contact.contactID,
        contactID: contact.contactID || contact.id
    }));
}

/**
 * Load all contacts from backend
 */
async function loadContacts() {
    try {
        const loadedContacts = await loadAllContacts();
        
        if (Array.isArray(loadedContacts)) {
            contacts = processLoadedContacts(loadedContacts);
        } else {
            console.error("Invalid contacts data:", loadedContacts);
            loadContactsFromLocalStorage();
        }
    } catch (error) {
        console.error("Failed to load contacts:", error);
        loadContactsFromLocalStorage();
    }
}

/**
 * Load contacts from localStorage as fallback
 */
function loadContactsFromLocalStorage() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) {
        contacts = JSON.parse(localContacts);
    }
}

/**
 * Load all users from backend
 */
async function loadUsers() {
    try {
        const loadedUsers = await loadAllUsers();
        if (Array.isArray(loadedUsers)) {
            // Map backend user format to our format if needed
            users = loadedUsers.map(user => {
                // Django serializer renames id to userID
                return user;
            });
        } else {
            console.error("Invalid users data:", loadedUsers);
            // Try to load from localStorage as fallback
            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                users = JSON.parse(localUsers);
            }
        }
    } catch (error) {
        console.error("Failed to load users:", error);
        // Try to load from localStorage as fallback
        const localUsers = localStorage.getItem('users');
        if (localUsers) {
            users = JSON.parse(localUsers);
        }
    }
}

/**
 * Load the current user from local storage
 */
async function loadActualUser() {
    // This uses localStorage only
    const loadedActualUser = localStorage.getItem('actualUser');
    if (loadedActualUser) {
        actualUser = JSON.parse(loadedActualUser);
    }
}

/**
 * Load remember me setting from local storage
 */
async function loadRememberMe() {
    // This uses localStorage only
    const loadedRememberMe = localStorage.getItem('rememberMe');
    if (loadedRememberMe && typeof rememberMe !== 'undefined') {
        rememberMe = JSON.parse(loadedRememberMe);
    }
}

/**
 * Initialize the application by loading all data
 */
async function initApp() {
    try {
        // Load data from backend
        await Promise.all([
            loadContacts(),
            loadTasks(),
            loadUsers(),
            loadActualUser(),
            loadRememberMe()
        ]);
        
        // Ensure at least one user exists
        await ensureDefaultUser();
        
        console.log("Application initialized");
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

/**
 * Ensure at least one user exists in the database
 */
async function ensureDefaultUser() {
    try {
        const users = await loadAllUsers();
        
        // If there are no users, create a default one
        if (!users || users.length === 0) {
            console.log("No users found. Creating a default user...");
            
            const defaultUser = {
                name: "Default User",
                email: "default@example.com",
                password: "defaultpassword" // In production, use a secure password
            };
            
            const response = await storeUser(defaultUser);
            console.log("Default user creation response:", response);
            
            // Reload users after creating the default one
            await loadUsers();
        }
    } catch (error) {
        console.error("Error ensuring default user:", error);
    }
}

// Call initApp when the page loads
window.addEventListener('DOMContentLoaded', initApp);