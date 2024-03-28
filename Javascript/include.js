async function includeHTML() {
    console.log("includeHTML aufgerufen");
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
  }

function openNavbar(){
    document.getElementById('navbar').classList.remove('d-none');
}

function closeNavbar(){
    document.getElementById('navbar').classList.add('d-none');
}

function disabledNavbar(){
  document.getElementById('navbar-container').classList.add('d-none');
}