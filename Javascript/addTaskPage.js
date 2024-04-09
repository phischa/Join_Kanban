let priority = "none";

async function onload() {
  loadTasks();
  loadUsers();
  
  await loadContacts();
  
  await loadActualUser();
  
  pressMediumButton();
  addContactsToPage();
}


//------------------min date----------------
const today = new Date().toISOString().split('T')[0];
document.getElementById('ldatename').setAttribute('min', today);




//------------  Hover over disabled CreateTaskButton results in red border for required -------

document
  .getElementById("ldatename")
  .addEventListener("change", function (event) {
    checkCreateTask();
  });

document
  .getElementById("createTaskButton")
  .addEventListener("mouseover", function (event) {
    let title = document.getElementById("ltitlename");
    let date = document.getElementById("ldatename");
    let category = document.getElementById("lcategoryname");
    let text = document.getElementById("requiredText");

    if (title.value == "") {
      title.style.border = "2px solid red";
      
    }

    if (!date.value) {
      date.style.border = "2px solid red";
    }

    if (!category.selectedIndex > 0) {
      category.style.border = "2px solid red";
    }

    if (title.value == "" || !date.value || !category.selectedIndex > 0) {
      text.style.border = "2px solid red";
    }
  });

document
  .getElementById("createTaskButton")
  .addEventListener("mouseout", function (event) {
    let title = document.getElementById("ltitlename");
    let date = document.getElementById("ldatename");
    let category = document.getElementById("lcategoryname");
    let text = document.getElementById("requiredText");

    if (title.style.border == "2px solid red") {
      title.style.border = "0.063rem solid #D1D1D1";
    }

    if (date.style.border == "2px solid red") {
      date.style.border = "0.063rem solid #D1D1D1";
    }

    if (category.style.border == "2px solid red") {
      category.style.border = "0.063rem solid #D1D1D1";
    }

    if (text.style.border == "2px solid red") {
      text.style.border = "";
    }
  });

//------------ schließt offene auswahlmenüs bei klick außerhalb
document.addEventListener("click", function (event) {
  let targetElement = event.target;

  renderAssignedToRenderArea();
  checkCreateTask();
  checkAssignedEventArea(targetElement);
  checkCategoryEventArea(targetElement);
});

//-------Funktionen zum Disablen des createTaskButtons

document.addEventListener("keyup", function (event) {
  checkCreateTask();
});

function checkCreateTask() {
  if (
    document.getElementById("ltitlename").value.length >= 1 &&
    document.getElementById("ldatename").value &&
    document.getElementById("lcategoryname").selectedIndex > 0
  ) {
    document.getElementById("createTaskButton").disabled = false;
    document
      .getElementById("createTaskButton")
      .classList.add("button-createtask");
  } else {
    document.getElementById("createTaskButton").disabled = true;
    document
      .getElementById("createTaskButton")
      .classList.remove("button-createtask");
  }
}

//------------------Submit and clear Functions for main form buttons

function clearForm() {
  document.getElementById("ldescriptionname").value = "";
  assignedContacts = [];
  document.getElementById("ldatename").value = "";
  uncheckprio();
  pressMediumButton();
  document.getElementById("lcategoryname").value = "Select task category";
  clearSubtaskInput();
  subtasksOfAddPage = [];
  renderSubtaskArea();
  actualSubtaskOfAddPage = null;
}

function submitTask() {
  console.log("submitte Task");

  let title = document.getElementById("ltitlename");
  let description = document.getElementById("ldescriptionname").value;
  let assigned = assignedContacts;
  let date = document.getElementById("ldatename").value;
  let prio = priority;
  let category = document.getElementById("lcategoryname").value;

  finalizeSubtasks();
  let subtasks = finalSubtasksOfAddPage;

  createTask(
    title.value,
    description,
    assigned,
    date,
    prio,
    category,
    subtasks
  );
  storeTasks();
  clearRenderArea();
  title.value = title.defaultValue;
  clearForm();
  showModal();
  setTimeout(goToBoard, 500);

 
}


function goToBoard(){
  window.location.href="board.html";
}

//------ Modal Functions

function showModal(){
      modal= document.getElementById('modalConfirmTaskCreated');
      modal.style.display = 'flex';

}

//---------- Functions for Setting Priority

function pressUrgentButton() {
  if (priority == "none") {
    markUrgent();
    priority = "urgent";
  } else if (priority == "urgent") {
    unmarkUrgent();
    priority = "none";
  } else if (priority != "none") {
    unmarkLow();
    unmarkMedium();
    markUrgent();
    priority = "urgent";
  }
}

function pressMediumButton() {
  if (priority == "none") {
    markMedium();
    priority = "medium";
  } else if (priority == "medium") {
    unmarkMedium();
    priority = "none";
  } else if (priority != "none") {
    markMedium();
    unmarkLow();
    unmarkUrgent();
    priority = "medium";
  }
}

function pressLowButton() {
  if (priority == "none") {
    markLow();
    priority = "low";
  } else if (priority == "low") {
    unmarkLow();
    priority = "none";
  } else if (priority != "none") {
    unmarkMedium();
    markLow();
    unmarkUrgent();
    priority = "low";
  }
}

function markUrgent() {
  document.getElementById("urgentButton").classList.add("urgentButtonPressed");
  document.getElementById("urgentButtonImage").src =
    "../img/icons/urgent-icon-white.svg";
}

function unmarkUrgent() {
  document
    .getElementById("urgentButton")
    .classList.remove("urgentButtonPressed");
  document.getElementById("urgentButtonImage").src =
    "../img/icons/urgent-icon.svg";
}

function markMedium() {
  document.getElementById("mediumButton").classList.add("mediumButtonPressed");
  document.getElementById("mediumButtonImage").src =
    "../img/icons/priority-medium-white.svg";
}

function unmarkMedium() {
  document
    .getElementById("mediumButton")
    .classList.remove("mediumButtonPressed");
  document.getElementById("mediumButtonImage").src =
    "../img/icons/priority-medium.svg";
}

function markLow() {
  document.getElementById("lowButton").classList.add("lowButtonPressed");
  document.getElementById("lowButtonImage").src =
    "../img/icons/low-icon-white.svg";
}

function unmarkLow() {
  document.getElementById("lowButton").classList.remove("lowButtonPressed");
  document.getElementById("lowButtonImage").src = "../img/icons/low-icon.svg";
}

function uncheckprio() {
  unmarkLow();
  unmarkMedium();
  unmarkUrgent();
  priority = "none";
}
