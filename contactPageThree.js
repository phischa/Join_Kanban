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