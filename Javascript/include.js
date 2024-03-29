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
    await searchAndHideElements();
}

async function searchAndHideElements(){
  let isToHide =  document.querySelectorAll("[isToHide]")
  if (isToHide.length > 0){
  let elements = document.querySelectorAll("[toHideElement]")
    for (let i =0; i < elements.length; i++){
        elements[i].classList.add("hideElement");
        }
    }
}
