function onload(){
    loadUsers();
    loadContacts();
    loadTasks();
    
}




console.log("STORAGE TEST");



//let title= "Programmieren";
//let description="Kaffee in Code verwandeln"
//let assignedTo=["Ich","Wir", "Alle"];
//let dueDate = new Date();
//let priority = "medium";
//let category = "Software Design";
//let subtasks = ["clean Code beachten", "an Logik verzweifeln", "Kommentare schreiben"];


//createContact("Hans Ernst Georg Schuster", "schuster@example.org", "0823482373473");
//createContact("Maria Teresia Dobschanksi", "dobbe@example.org", "123344556");

//createTask(title, description, assignedTo, dueDate, priority, category, subtasks);


console.log(contacts);
console.log(tasks);
console.log(users);

// '[{"contactID": "7645970009159992", "name": "Peter Lustig", "email": "wer@kwner", "phone": "8347877445", "initials": "PL"}, {"contactID": "2417172205769011", "name": "Peter Lustig", "email": "wer@kwner", "phone": "8347877445", "initials": "PL"}, {"contactID": "0700334824236751", "name": "Bob Baumeister", "email": "ghg@fjfe.de", "phone": "2344445", "initials": "BB"}]'

// "[{\"contactID\": \"7645970009159992\", \"name\": \"Peter Lustig\", \"email\": \"wer@kwner\", \"phone\": \"8347877445\", \"initials\": \"PL\"}, {\"contactID\": \"2417172205769011\", \"name\": \"Peter Lustig\", \"email\": \"wer@kwner\", \"phone\": \"8347877445\", \"initials\": \"PL\"}, {\"contactID\": \"0700334824236751\", \"name\": \"Bob Baumeister\", \"email\": \"ghg@fjfe.de\", \"phone\": \"2344445\", \"initials\": \"BB\"}]"