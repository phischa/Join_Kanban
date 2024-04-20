/**
 * This function uses the "w3 include method" to include HTML templates
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  initInclude();
}

async function initInclude() {
  await searchAndHideElements();
  await loadActualUser();
  await initialsOf();
}

async function searchAndHideElements() {
  let isToHide = document.querySelectorAll("[isToHide]")
  if (isToHide.length > 0) {
    let elements = document.querySelectorAll("[toHideElement]")
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("hideElement");
    }
  }
}

/**
 * This function switches the navbar on or out if the user clicks on the circle in the top corner.
 */
function openNavbar() {
  document.getElementById('navbar').classList.toggle('d-none');
}

/**
 * This function hides the navbar if the user clicks on the main container.
 */
function closeNavbar() {
  document.getElementById('navbar').classList.add('d-none');
}

/**
 * This function hides the sidebar if no user is locked in.
 */
function sidebarRestricted() {
  if (actualUser != "Standarduser") {
    document.getElementById('navi-hide').classList.remove('d-none');
  } else {
    document.getElementById('navi-hide').classList.add('d-none');
  }
}