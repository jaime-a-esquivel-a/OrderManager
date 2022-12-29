const addClientForm = document.getElementById('addClient-form');

function newClientHandler(event){

    event.preventDefault();

    const newClientRFC = document.getElementById('inputRFC').value;
    const newClientActive = document.getElementById('inputActive').checked;
    const newClientName = document.getElementById('inputClientName').value;
    const newClientEmail = document.getElementById('inputClientEmail').value;
    const newClientTel = document.getElementById('inputClientTel').value;
    const newClientAddress = document.getElementById('inputClientAddress').value;

    console.log(newClientRFC);
    console.log(newClientActive);
    console.log(newClientName);
    console.log(newClientEmail);
    console.log(newClientTel);
    console.log(newClientAddress);

}

// Add the event handler for the form submission
addClientForm.addEventListener('submit', newClientHandler);