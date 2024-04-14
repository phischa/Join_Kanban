function showBlackBox(){
    let lightbox = document.getElementById("lightbox");
    let blackbox = document.getElementById("blackbox");
    blackbox.classList.remove("disable");
    blackbox.classList.add("enable");
    lightbox.classList.remove("slide-out-right");
    lightbox.classList.add("slide-in-right");
    setBlur(true);
}


function setBlur(turnOn = true){
    let elements = document.querySelectorAll("[can-Blur]");
    for (let i = 0; i < elements.length; i++){
        if(turnOn){
        elements[i].classList.add("addBlur");
        } else{
        elements[i].classList.remove("addBlur");
        }
    }
}


function hideBlackbox(){
    let lightbox = document.getElementById("lightbox");
    let blackbox = document.getElementById("blackbox");
    lightbox.classList.remove("slide-in-right");
    lightbox.classList.add("slide-out-right");
    setTimeout(() =>{
        blackbox.classList.remove("enable");
        disableBlackbox();
        setBlur(false);
    }, 150);
}


function disableBlackbox(){
    let blackbox = document.getElementById("blackbox");
    setTimeout(() =>{
        blackbox.classList.add("disable");
    }, 250);
}


function ignorclick(event){
    event.stopPropagation();
}