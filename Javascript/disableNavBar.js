async function includeAndHide(){
    await includeHTML();
    let element = document.getElementById("toHideElement");
    console.log(element);
    element.classList.add("hideElement");
}
