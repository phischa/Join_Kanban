/**
 * loads function that have to be loaded upFront.
 */
async function onload() {
  await loadActualUser();
  initMobileGreeting();
  await loadContacts();
  await loadTasks();
  

  renderSummary();
}

/**
 * Renders all html fields for the Site
 */
function renderSummary() {
  renderGreeting();
  renderNumberToDo();
  renderNumberDone();
  renderNumberUrgent();
  renderUpcomingDueDate();
  renderNumberTaksInBoard();
  renderNumberInProgress();
  renderNumberAwaitingFeedback();
}

/**
 * Renders the Greeting Area, consisting of Daytime and the Username, if a User
 * is logged in.
 */
function renderGreeting() {
  renderDaytime("greetingname");
  renderUserName("username");
}

/**
 * Renders the Daytime for the greeting and
 * chosing the right punctuation, in case there is a personal
 * greeting for a logged in user
 */
function renderDaytime(divId) {
  let daytime = actualHour();
  let greeting = getGreeting(daytime);
  let field = document.getElementById(divId);
  if (actualUser.name) {
    //Condition that a User is logged in
    field.innerHTML = greeting + ",";
  } else {
    field.innerHTML = greeting + "!";
  }
}

/**
 * this function is given the hour of the day and  returns
 * an apropiate Greeting text
 * @param {Number} daytime
 * @returns {String} apropiate Greeting text
 */

function getGreeting(daytime) {
  switch (true) {
    case daytime >= 22 && daytime < 24:
      return "It is nighttime";

    case daytime >= 0 && daytime < 5:
      return "It is nighttime";

    case daytime >= 5 && daytime < 12:
      return "Good morning";

    case daytime >= 12 && daytime < 14:
      return "Lunchtime";

    case daytime >= 14 && daytime < 18:
      return "Good afternoon";

    case daytime >= 18 && daytime < 22:
      return "Good evening";
  }
}

/**
 * functions renders the Username for a loggedIn User
 * or returns an empty string if no user is logged in
 */
function renderUserName(divID) {
  let user;
  field = document.getElementById(divID);

  if (actualUser.name) {
    user = actualUser.name;
    field.innerHTML = user;
  } else {
    field.innerHTML = "";
  }

  /**
   * function renders the amount of tasks with the progress
   * "to Do"
   */
}

function renderNumberToDo() {
  let field = document.getElementById("number-to-do");
  let number = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].currentProgress == 0) {
      number++;
    }
  }

  field.innerHTML = number;
}

/**
 * function renders the amount of tasks with the progress
 * "done"
 */

function renderNumberDone() {
  let field = document.getElementById("number-done");
  let number = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].currentProgress == 3) {
      number++;
    }
  }

  field.innerHTML = number;
}

/**
 * function renders the amount of tasks with the priority
 * "urgent"
 */
function renderNumberUrgent() {
  let field = document.getElementById("number-urgent");
  let number = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].priority == "urgent") {
      number++;
    }
  }

  field.innerHTML = number;
}

/**
 * functions renders the amount of tasks in the whole board
 */
function renderNumberTaksInBoard() {
  let field = document.getElementById("numberTasksinboard");
  field.innerHTML = tasks.length;
}

/**
 *  funtion renders the amount of tasks with the progress
 * "in progress"
 */
function renderNumberInProgress() {
  let field = document.getElementById("number-tasksinprogress");
  let number = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].currentProgress == 1) {
      number++;
    }
  }

  field.innerHTML = number;
}

/**
 * function renders the earlist upcoming duedate and
 * triggers an alarm if need be
 */
function renderUpcomingDueDate() {
  let field = document.getElementById("deadlineDate");
  let date = getEarliestDateOfNotDone();
  let danger = isDateEarlierThanTomorrow(date);
  let holdTaskId = "";
  if (danger) {
    //Mach URGENT Farbe und BLINKI BLINKI
    alarm();
  }
  if (date != 0) {
    date = konvertiereDatum(date);
    field.innerHTML = date;
  } else {
    field.innerHTML = "no Date";
  }
}

/**
 * function renders amount of tasks with progress
 * "await feedback"
 */
function renderNumberAwaitingFeedback() {
  let field = document.getElementById("number-awaitingfeedback");
  let number = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].currentProgress == 2) {
      number++;
    }
  }

  field.innerHTML = number;
}

/**
 * function delivers earliest date of all tasks with the progess "not done" and
 * then remembers what task exactly had the earliest date of them all.
 * @returns {number}
 */
function getEarliestDateOfNotDone() {
  let earliestDate = 0;
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].currentProgress < 3 && tasks[i].dueDate != "") {
        if (earliestDate == 0 || earliestDate > tasks[i].dueDate) {
          earliestDate = tasks[i].dueDate;
          holdTaskId = tasks[i]["taskID"];
        }
      }
    }
  }
  return earliestDate;
}

/**
 * functon converts a DateString from format yyyy-mm-dd to format month-dd-yyyy
 * @param {String} datumString
 * @returns {String}
 */

function konvertiereDatum(datumString) {
  // Datum parsen
  let datumTeile = datumString.split("-");
  let jahr = parseInt(datumTeile[0]);
  let monat = parseInt(datumTeile[1]);
  let tag = parseInt(datumTeile[2]);

  // Monatsnamen-Array
  let monatsNamen = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Monatsnamen erhalten
  let monatsName = monatsNamen[monat - 1];

  // Formatieren und zurückgeben
  let formatiertesDatum = monatsName + " " + tag + ", " + jahr;
  return formatiertesDatum;
}

/**
 * functions checks if a given date is earlier than the date of tomorrow
 *
 * @param {date} date
 * @returns {boolean}
 */
function isDateEarlierThanTomorrow(date) {
  let danger = false;
  let actualDate = getActualDate();

  if (date <= actualDate) {
    danger = true;
  } else {
    danger = false;
  }

  return danger;
}

/**
 * controls the blinking effect of the duedate on the prio urgent task field.
 * the blinking needs to be adjusted in relation to the fact that the prio urgent
 * field has a hovering effect.
 *  * 
 */
function alarm() {
  let divElement = document.getElementById("containerDeadLine");
  let interval2;
  let hexFarbe = "#FF3D00";

  //sets the intervall for blinking without hovering
  let interval1 = setInterval(blinken, 1000); // Intervall von 1 Sekunde




  surroundDivElement = document.getElementById("prioContent");

  //sets the intervall when mouse is hovering over
    surroundDivElement.addEventListener("mouseover", function () {
    divElement.style.backgroundColor = "#2A3647";
    divElement.style.transition = "background-color 0.3s ease-in-out";
    clearInterval(interval1);
    interval2 = setInterval(blinkenMouseover, 1000); // Intervall von 1 Sekunde
  });

  //sets the intervall back when mouse is not hovering anymore
    surroundDivElement.addEventListener("mouseout", function () {
    divElement.style.backgroundColor = "#FFFFFF";
    divElement.style.transition = "background-color 0.0s ease-in-out";
    interval1 = setInterval(blinken, 1000);
    clearInterval(interval2); // Intervall von 1 Sekunde
  });

  

}


  /**
   *  function for blinking effect of element which is not hovered over
   * because background color of not hovered div
   */
  function blinken() {
    let divElement = document.getElementById("containerDeadLine");
    let aktuelleFarbe = divElement.style.backgroundColor;
    let neueFarbe;
    let hexFarbe = "#FF3D00";

    if (aktuelleFarbe == "") {
      neueFarbe = hexFarbe;
      divElement.style.backgroundColor = neueFarbe;
    } else if (aktuelleFarbe == hexToRgb(hexFarbe)) {
      neueFarbe = "#FFFFFF";
      divElement.style.backgroundColor = neueFarbe;
    } else if (aktuelleFarbe == hexToRgb("#FFFFFF")) {
      neueFarbe = hexFarbe;
      divElement.style.backgroundColor = neueFarbe;
    }
  }

  /**
   * function for blinking effect of element which is hovered over
   * becasue background color of hovered div
   */
  function blinkenMouseover() {
    let divElement = document.getElementById("containerDeadLine");
    let aktuelleFarbe = divElement.style.backgroundColor;
    let neueFarbe;
    let hexFarbe = "#FF3D00";

    if (aktuelleFarbe == "#FFFFFF") {
      neueFarbe = "#2A3647";
      divElement.style.backgroundColor = neueFarbe;
    } else if (aktuelleFarbe == hexToRgb(hexFarbe)) {
      neueFarbe = "#2A3647";
      divElement.style.backgroundColor = neueFarbe;
    } else if (aktuelleFarbe == hexToRgb("#2A3647")) {
      neueFarbe = hexFarbe;
      divElement.style.backgroundColor = neueFarbe;
    }
  }



/**
 * functions converts a hex color to a rgb color
 * @param {String} hex
 * @returns {String}
 */
function hexToRgb(hex) {
  // Entferne das #, falls vorhanden
  hex = hex.replace("#", "");

  // Teile den Hexadezimalwert in rote, grüne und blaue Werte auf
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Konvertiere die RGB-Werte in das RGB-Format
  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

  return rgb;
}

/**
 * function returns the actual date in format yyyy-mm-dd
 * @returns {String}
 */
function getActualDate() {
  var jetzt = new Date();
  var jahr = jetzt.getFullYear();
  var monat = ("0" + (jetzt.getMonth() + 1)).slice(-2); // Monat (von 0 bis 11) auf 1-basiert ändern und führende Nullen hinzufügen
  var tag = ("0" + jetzt.getDate()).slice(-2); // Tag mit führenden Nullen hinzufügen

  return jahr + "-" + monat + "-" + tag;
}

/**
 * function returns the actual hour of the day
 * @returns {Number}
 */
function actualHour() {
  let now = new Date();
  let hour = now.getHours();
  return hour;
}

/**
 * function goes to the board and at the same time searches for the task
 * which id is stored
 */
function goToBoard() {
  window.location.href =
    "./board.html?findtaskbyid=" + encodeURIComponent(holdTaskId);
}

/**functions goes to Board */
function goToBoardUsual() {
  window.location.href = "./board.html";
}

/**
 * controls the greeting with a modal when the page is in responsive mode
 */
function initMobileGreeting(){
  disableScroll();
      renderMobileModal();
      setTimeout(hideModal,1000);
}

/**
 * hide the responsive greeting modal after a given time
 */
function hideModal(){
      let greetingModal = document.getElementById('modalMobileGreeting');
      greetingModal.style.display='none';
      enableScroll();

}

/**
 * renders the mobile Greeting Modal 
 */
function renderMobileModal(){
    let greetingModal = document.getElementById('modalMobileGreeting');
    let greeting = document.getElementById('greetingname2');
    let name = document.getElementById('username2');
    renderDaytime('greetingname2');
    renderUserName('username2');

}



/**
 * function is called when Mobile greeting is active to
 * prevent user from scrolling when the modal is shown
 * 
 */
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

/**
 * function is called when mobile greeting is over to let
 * the user scroll again
 */
function enableScroll() {
  document.body.style.overflow = ''; // Setzt den Overflow-Stil zurück, um das Scrollen zu aktivieren
}