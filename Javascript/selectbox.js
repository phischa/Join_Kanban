function toggleSelectWindows(id){
    let overlay = document.getElementById(`selectOverlay_${id}`);
    let input = document.getElementById(`selectInput_${id}`);
    let selectarea = document.getElementById(`selectArea_${id}`)
    let button = document.getElementById(`selectInputButton_${id}`)
    let boarder =  document.getElementById(`selectBoarder_${id}`);
    overlay.classList.toggle("overlayshow");
    input.classList.toggle("searchDisable");
    selectarea.classList.toggle("dshow");
    button.classList.toggle("arrowUpIcon");
    boarder.classList.toggle("boarderBlue");
}

function toggleAddWindows(id, turnOn, isToSave = false){
    let content = document.getElementById(`selectAddInput_${id}`);
    let input = document.getElementById(`selectAddInputField_${id}`);
    let contentid = `selectAddInput_${id}`;
    if(isToSave){
        saveNewSubtask(input.value, contentid);
    }
    if(turnOn){
        content.innerHTML = renderAddInputFieldTurnOn(id);
    } else{
        content.innerHTML = renderAddInputFieldTurnOff(id);
    }
}


function renderAddInputFieldTurnOn(id){
    return `
    <div class="selectInput">
    <div class="selectInputBoarder boarderBlue">
        <div id="selectInputArea" class="selectInputArea">
            <input id="selectAddInputField_${id}" placeholder="Add your Task here" class="selectInputSearchBar">
        </div>
        <div class="selectSafeSpace selectAreaSelectorFadeBackgound FadeBackgoundBigger">
            <div class="selectEditMenu">
                <div onclick="toggleAddWindows(${id}, false)" class="selectInputIcon undoIcon"></div>
                <hr>
                <div onclick="toggleAddWindows(${id}, false, true)" class="selectInputIcon checkIcon"></div>
            </div>
        </div>
    </div>
    `
}


function renderAddInputFieldTurnOff(id){
    return `
    <div class="selectInput">
        <div class="selectInputBoarder">
            <div onclick="toggleAddWindows(${id}, true)" id="selectOverlay_1" class="selectInputText overlayshow">Add a new Subtask</div>
        <div class="selectSafeSpace selectAreaSelectorFadeBackgound">
            <div onclick="toggleAddWindows(${id}, true)" class="selectInputIcon plusIcon"></div>
        </div>
    </div>
    `
}