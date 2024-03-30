
let expanded = false;
let inputFeld = document.getElementById('inputfeld');

inputFeld.value="ICH BIN VALUE!"

function render(){
    drawColoredCircle('#F8238F','BB', 'ctx1');
}


document.getElementById('selectBox').addEventListener("keypress", function(event) {
  event.preventDefault();
});

inputFeld.addEventListener("keypress", function(e) {
  if (e.key === "Enter" || (e.keyCode || e.which) === 13)
      e.preventDefault();
    e.stopPropagation();
});


inputFeld.addEventListener('click',function (e) 
    {
    // Ereignis behandeln
    console.log("Input click");
        e.preventDefault();
        e.stopPropagation();
    });



function showCheckboxes() {
  let checkboxes = document.getElementById("checkboxes");
  let searchField = document.getElementById("searchfield");
  let selectField = document.getElementById("selectfield");
  if (!expanded) {
    checkboxes.style.display = "flex";
    searchField.style.display= 'flex';
    selectField.style.display="none";
    inputFeld.focus();
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    searchField.style.display= 'none';
    selectField.style.display="block";
    expanded = false;
  }
}