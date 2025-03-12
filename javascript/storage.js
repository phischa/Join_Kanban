// Base API URL - updated to match your Django backend URL
// Including '/api/' prefix based on your error message
const STORAGE_URL = "http://127.0.0.1:8000/api/";
const API_URL = `${STORAGE_URL}`;

/**
 * Fetches data from the API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Array>} - Fetched data
 */
async function getItem(endpoint) {
    try {
        const response = await fetch(`${API_URL}${endpoint}/`);
        
        if (!response.ok) {
            console.error(`Error fetching from ${endpoint}: ${response.status}`);
            return [];
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error in getItem(${endpoint}):`, error);
        return [];
    }
}

/**
 * Sends data to the API
 * @param {string} endpoint - API endpoint
 * @param {Object|Array} value - Data to send
 * @returns {Promise<Object>} - Response data
 */
async function setItem(endpoint, value) {
    try {
        // Log what we're sending for debugging
        console.log(`Sending to ${endpoint}:`, value);
        
        // Make the POST request
        const response = await fetch(`${API_URL}${endpoint}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        
        // If not successful, try to get more detailed error information
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error posting to ${endpoint}: ${response.status}`);
            console.error(`Response body: ${errorText}`);
            
            try {
                // Try to parse the error as JSON for more details
                const errorJson = JSON.parse(errorText);
                console.error("Detailed error:", errorJson);
                return { 
                    status: "error", 
                    details: errorJson,
                    message: `Server returned ${response.status}`
                };
            } catch (parseError) {
                // If not JSON, return the text
                return { 
                    status: "error", 
                    message: `Server returned ${response.status}: ${errorText}` 
                };
            }
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error in setItem(${endpoint}):`, error);
        return { status: "error", message: error.message };
    }
}

/**
 * Updates data at the API
 * @param {string} endpoint - API endpoint
 * @param {string|number} id - Resource ID
 * @param {Object} value - Data to update
 * @returns {Promise<Object>} - Response data
 */
async function updateItem(endpoint, id, value) {
    try {
        const response = await fetch(`${API_URL}${endpoint}/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        
        if (!response.ok) {
            console.error(`Error updating ${endpoint}/${id}: ${response.status}`);
            return { status: "error" };
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error in updateItem(${endpoint}, ${id}):`, error);
        return { status: "error", message: error.message };
    }
}

/**
 * Deletes data from the API
 * @param {string} endpoint - API endpoint 
 * @param {string|number} id - Resource ID or data with ID
 * @returns {Promise<Object>} - Response data
 */
async function deleteItem(endpoint, id) {
    try {
        // For the Django backend, we need to send the ID in the request body for DELETE
        const data = typeof id === 'object' ? id : { [`${endpoint.slice(0, -1)}ID`]: id };
        
        const response = await fetch(`${API_URL}${endpoint}/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            console.error(`Error deleting ${endpoint}/${id}: ${response.status}`);
            return { status: "error" };
        }
        
        return { status: "success" };
    } catch (error) {
        console.error(`Error in deleteItem(${endpoint}, ${id}):`, error);
        return { status: "error", message: error.message };
    }
}

// Load functions
async function loadAllTasks() {
    return await getItem('tasks');
}

async function loadAllContacts() {
    return await getItem('contacts');
}

async function loadAllUsers() {
    return await getItem('users');
}

// Store functions for individual items
async function storeTask(task) {
    // Prepare task data for Django backend compatibility
    const formattedTask = { ...task };
    
    // Format subtasks if they exist
    if (formattedTask.subtasks && Array.isArray(formattedTask.subtasks)) {
        formattedTask.subtasks = formattedTask.subtasks.map(subtask => {
            // If subtask has subTaskName property but not name, add name
            if (subtask.subTaskName && !subtask.name) {
                return { ...subtask, name: subtask.subTaskName };
            }
            return subtask;
        });
    }
    
    // Format assignedTo if it exists
    if (formattedTask.assignedTo && Array.isArray(formattedTask.assignedTo)) {
        formattedTask.assignedTo = formattedTask.assignedTo.map(contact => {
            // If contact is just an ID, convert to object with contactID
            if (typeof contact !== 'object') {
                return { contactID: contact };
            }
            // If contact doesn't have contactID but has id, use that
            if (!contact.contactID && contact.id) {
                return { contactID: contact.id };
            }
            return contact;
        });
    }
    
    // Django expects 'taskID' for identification
    if (formattedTask.taskID) {
        // Update existing task
        return await updateItem('tasks', formattedTask.taskID, formattedTask);
    } else {
        // Create new task
        return await setItem('tasks', formattedTask);
    }
}

async function storeContact(contact) {
    // Django expects 'contactID' for identification
    if (contact.contactID) {
        // Update existing contact
        return await updateItem('contacts', contact.contactID, contact);
    } else {
        // Create new contact
        return await setItem('contacts', contact);
    }
}

async function storeUser(user) {
    // Django expects 'userID' for identification
    if (user.userID) {
        // Update existing user
        return await updateItem('users', user.userID, user);
    } else {
        // Create new user
        return await setItem('users', user);
    }
}

// Store functions for collections
/**
 * Store all tasks to backend
 */
async function storeTasksToBackend(tasksArray) {
    try {
        // Check if we have an array or a single task
        const isArray = Array.isArray(tasksArray);
        
        // Ensure a default user exists before trying to create tasks
        await ensureDefaultUserExists();
        
        // For debugging: log the data we're about to send
        console.log(`Storing ${isArray ? tasksArray.length + ' tasks' : 'a single task'} to backend`);
        
        // Format each task to ensure it has the expected structure
        const formattedTasks = isArray ? tasksArray.map(formatTaskForBackend) : formatTaskForBackend(tasksArray);
        
        // Send to the API
        const response = await fetch(`${API_URL}tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedTasks)
        });
        
        // Handle non-OK responses with more detailed information
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error storing tasks: ${response.status}`);
            console.error(`Response body: ${errorText}`);
            
            try {
                // Try to parse the error response as JSON
                const errorJson = JSON.parse(errorText);
                console.error("Detailed error:", errorJson);
                return { 
                    status: "error", 
                    details: errorJson,
                    message: `Server returned ${response.status}`
                };
            } catch (parseError) {
                // If not JSON, return the text
                return { 
                    status: "error", 
                    message: `Server returned ${response.status}: ${errorText}` 
                };
            }
        }
        
        console.log("Tasks stored successfully");
        const responseData = await response.json();
        return { status: "success", data: responseData };
    } catch (error) {
        console.error("Failed to store tasks:", error);
        return { status: "error", message: error.message };
    }
}

/**
 * Ensure a default user exists in the database before creating tasks
 */
async function ensureDefaultUserExists() {
    try {
        // Check if we already have users loaded
        if (!window.users || window.users.length === 0) {
            // Try to load users first
            const users = await loadAllUsers();
            
            // If still no users, create a default one
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
                const newUsers = await loadAllUsers();
                window.users = newUsers;
            } else {
                window.users = users;
            }
        }
    } catch (error) {
        console.error("Error ensuring default user:", error);
    }
}

/**
 * Helper function to format a task object for the backend
 * @param {Object} task - Task object to format
 * @returns {Object} - Properly formatted task
 */
function formatTaskForBackend(task) {
    // Create a copy so we don't modify the original
    const formatted = { ...task };
    
    // Format assignedTo if it exists
    if (formatted.assignedTo && Array.isArray(formatted.assignedTo)) {
        formatted.assignedTo = formatted.assignedTo.map(contact => {
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
        });
    }
    
    // Format subtasks if they exist
    if (formatted.subtasks && Array.isArray(formatted.subtasks)) {
        formatted.subtasks = formatted.subtasks.map(subtask => {
            return {
                // Keep/add subTaskName as that's what the serializer expects
                subTaskName: subtask.subTaskName || subtask.name || "",
                // Include a 'done' flag
                done: Boolean(subtask.done)
            };
        });
    }
    
    // Make sure priority and category are valid
    if (formatted.priority && !["low", "medium", "high"].includes(formatted.priority)) {
        formatted.priority = "medium";
    }
    
    if (formatted.category && !["todo", "inprogress", "done"].includes(formatted.category)) {
        formatted.category = "todo";
    }
    
    // Ensure we have a user reference - try to add it if missing
    // This is for the first-level user property that Django needs
    if (!formatted.user && window.users && window.users.length > 0) {
        formatted.user = { userID: window.users[0].userID };
    }
    
    return formatted;
}

async function storeContactsToBackend(contactsArray) {
    try {
        // Send the contacts array to the API
        const response = await fetch(`${API_URL}contacts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactsArray)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        console.log("Contacts stored successfully");
        return { status: "success" };
    } catch (error) {
        console.error("Failed to store contacts:", error);
        return { status: "error", message: error.message };
    }
}

async function storeUsersToBackend(usersArray) {
    try {
        // Send the users array to the API
        const response = await fetch(`${API_URL}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usersArray)
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        console.log("Users stored successfully");
        return { status: "success" };
    } catch (error) {
        console.error("Failed to store users:", error);
        return { status: "error", message: error.message };
    }
}

// Delete functions
async function deleteTaskItem(taskId) {
    return await deleteItem('tasks', taskId);
}

async function deleteContactItem(contactId) {
    return await deleteItem('contacts', contactId);
}

async function deleteUserItem(userId) {
    return await deleteItem('users', userId);
}

// Local Storage functions for user session
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

// For guest login (keeps this functionality)
function storeActualUser(user) {
    saveToLocalStorage('actualUser', user);
}

function loadActualUser() {
    return getFromLocalStorage('actualUser');
}

function storeRememberMe(value) {
    saveToLocalStorage('rememberMe', value);
}

function loadRememberMe() {
    return getFromLocalStorage('rememberMe');
}

// For cleanup
function deleteActualUser() {
    removeFromLocalStorage('actualUser');
}

function deleteRememberMe() {
    removeFromLocalStorage('rememberMe');
}

// Legacy functions maintained for backwards compatibility
function deleteStoredTasks() {
    console.warn("This function is deprecated. Use API endpoints instead.");
}

function deleteStoredUsers() {
    console.warn("This function is deprecated. Use API endpoints instead.");
}

function deleteStoredContacts() {
    console.warn("This function is deprecated. Use API endpoints instead.");
}

//------------------end of storage---------------------------------------------------------------------------
