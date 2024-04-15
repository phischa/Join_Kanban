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
  await searchAndHideElements();
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


function openNavbar() {
  document.getElementById('navbar').classList.remove('d-none');
}


function closeNavbar() {
  document.getElementById('navbar').classList.add('d-none');
}

function sidebarRestricted(actualUser) {
  if (actualUser) {
    document.getElementById('navi-sidebar').classList.remove('d-none');
  } else {
    document.getElementById('navi-sidebar').classList.add('d-none');
  }
}