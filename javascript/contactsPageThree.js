/**
 *  This function saved once the edit contact
 */
function saveTheEditContact(){
    let eventButton = document.getElementById('button-save');

    eventButton.addEventListener("click", function () {
        if (!myStatusEditContact) {
            saveEditContact(editIndex);
            myStatusEditContact = true;
        }
    });
}
/**
 * This function change the color of the button save.
 */
function changeColorButton(){
    document.getElementById('button-save').disabled = false;
    document.getElementById('button-save').style.backgroundColor='#2A3647';
    document.getElementById('button-save').style.cursor = "pointer";
}

/**
 * This function is if the email available then the border will be red.  
 */
function ifEmailAvailableBorderRed(){
    disableButtonAndStartSave();
    document.getElementById('ltitleemail').style.outline = '2px solid red'; 
    document.getElementById('requiredemail').classList.remove('d-none');
}

/**
 * This function is if the email not available then the border will be white. 
 */
function ifEmailNotAvailableBorderRed(){
    document.getElementById('ltitleemail').style.outline = ''; 
    document.getElementById('requiredemail').classList.add('d-none');
}
    
 /**
  *  This function charge the color and enable the button and start the function saveEditContact.
 */
function disableButtonAndStartSave(){
    document.getElementById('button-save').disabled = true;
    document.getElementById('button-save').style.backgroundColor='#E5E5E5';
    document.getElementById('button-save').style.cursor = "default";
}
    
 /**
  *  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
  *  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be red.
*/
function validityFalseAboveButtonRedBorderEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');
   
    removesFocusFromInputField();
    changeBackColorFromButtonEditContactPage();
    checkValidationByTrueBorderRed(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function changes back the color for the create contact button on the addcontact page.
 */
function changeBackColorFromButtonEditContactPage(){
    let eventButton = document.getElementById('button-save');

    if(eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#E5E5E5';
        document.getElementById('button-save').style.cursor = "default";
    }
    if(!eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#25C0D4';
    }
}

/**
*  This function checks the validity of input name, e-mail and phone. If the mouse is above the button and if the validation isn't correct, 
*  the border of the elements ltitlename, ltitleemail, ltitlephone and text "This field is required" will be white.
*/
function validityFalseLeaveButtonWhiteBorderEditContact(){
    let statusValidationName = document.getElementById('ltitlename');
    let statusValidationEmail = document.getElementById('ltitleemail');
    let statusValidationPhone = document.getElementById('ltitlephone');

    changeColorFromButtonEditContactPage();
    checkValidationByTrueBorderInvisible(statusValidationName,statusValidationEmail,statusValidationPhone);
}

/**
 *  This function changes back the color for the create contact button on the editcontact page.
 */
function changeColorFromButtonEditContactPage(){
    let eventButton = document.getElementById('button-save');

    if(eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#E5E5E5';
    }
    if(!eventButton.disabled){
        document.getElementById('button-save').style.backgroundColor='#2A3647';
    }
}

/**
 *  This function deletes contacts of the edit page.
 */
function deleteContactFromEditPage(){
    document.getElementById('delete').classList.remove('d-none');
}

/**
 * This function checked is the Email available.
 */
function isThisEmailAvailable(suppliedemail){   
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].email == suppliedemail) {
        return true;
        }
    }
    return false;
}