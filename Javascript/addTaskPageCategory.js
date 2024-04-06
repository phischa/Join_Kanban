//----------- UI Handling --------------

function focusCategory() {
  document.getElementById("lcategoryname").style.border = "2px solid #25C0D4";
}

function blurCategory() {
  document.getElementById("lcategoryname").style.border =
    "0.063rem solid #D1D1D1";
}

function changeSelectArrow() {
  let select = document.getElementById("lcategoryname");
  let arrowImage;

  if (select.classList.contains("opened")) {
    arrowImage = "arrow_drop_downaa.svg";
  } else {
    arrowImage = "arrow_drop_up.svg";
  }

  select.classList.toggle("opened");

  select.style.backgroundImage = "url('..//img/icons/" + arrowImage + "')";
}

function checkCategoryEventArea(targetElement) {
  let selectCategory = document.getElementById("lcategoryname");

  if (!selectCategory.contains(targetElement)) {
    selectCategory.style.backgroundImage =
      "url('..//img/icons/arrow_drop_downaa.svg')";
    selectCategory.classList.remove("opened");
    blurCategory();
  }
}
