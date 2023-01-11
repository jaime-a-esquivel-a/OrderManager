const addClientForm = document.getElementById('addClient-form'); //Get form that allows client creation
const modifyClient = document.getElementById('TableClient'); //Get table that contains all clients
const deleteClients = document.getElementsByClassName('deleteClient'); //Get delete buttons for clients
const searchClients = document.getElementById('btnSearch'); //Get search button of clients section

//Function to create a new client
async function newClientHandler(event){
    event.preventDefault();
    const newClientRFC = document.getElementById('inputRFC').value; //Get RFC for client creation
    const newClientActive = document.getElementById('inputActive').checked; //Get Active value for client creation
    const newClientName = document.getElementById('inputClientName').value; //Get Name for client creation
    const newClientEmail = document.getElementById('inputClientEmail').value; //Get Email for client creation
    const newClientTel = document.getElementById('inputClientTel').value; //Get Telephone for client creation
    const newClientAddress = document.getElementById('inputClientAddress').value; //Get Address for client creation

    const response = await fetch( '/client', { //Fetch /client with POST method to create a new client
        method: 'POST',
        body: JSON.stringify({  //Send body with all data
            rfc : newClientRFC,
            active : newClientActive,
            name : newClientName,
            address : newClientAddress,
            tel : newClientTel,
            email : newClientEmail,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){ //If response was ok
        document.location.replace('/client'); //Go back to clients section
    }else{ //If not
        alert('Error when creating client'); //Send alert
    }


}

//Function to update a client
async function updateClientHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index; //Get index of the client to be updated
    if (event.target.matches(".UpdateClient")) {
        const updateClientRFC = document.getElementById(`inputRFC-${index}`).value; //Get RFC for client update
        const updateClientActive = document.getElementById(`inputActive-${index}`).checked; //Get Active value for client update
        const updateClientName = document.getElementById(`inputClientName-${index}`).value; //Get Name for client update
        const updateClientEmail = document.getElementById(`inputClientEmail-${index}`).value; //Get Email for client update
        const updateClientTel = document.getElementById(`inputClientTel-${index}`).value; //Get Telephone for client update
        const updateClientAddress = document.getElementById(`inputClientAddress-${index}`).value; //Get Address for client update
 

        const response = await fetch( `/client/${updateClientRFC}`, { //Fetch /client/:rfc with PUT method to update a client
            method: 'PUT',
            body: JSON.stringify({ //Send body with all data
                rfc : updateClientRFC,
                active : updateClientActive,
                name : updateClientName,
                address : updateClientAddress,
                tel : updateClientTel,
                email : updateClientEmail,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){ //If response was ok
            document.location.replace('/client'); //Go back to clients section
        }else{ //If not
            alert('Error when updating client'); //Send alert
        }

    } 
}

//Function to delete a client
async function deleteClientHandler(event) {
    const index = event.target.dataset.index; //Get index of the client to be deleted
    let deleteRFC = document.getElementById(`RFCvalue-${index}`).innerText; //Get the RFC of the client to be deleted
    const response = await fetch( `/client/${deleteRFC}`, {  //Fetch /client/:rfc with DELETE method to delete a client
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){ //If response was ok
        document.location.replace('/client'); //Go back to clients section
    }else{ //If not
        alert('Error when deleting client'); //Send alert
    }
}

//Function to seach a client
async function searchClientHandler(event) {
    event.preventDefault();
    const rfc_string = document.getElementById('inputSearch').value; //Get RFC introduced in the input
    if (rfc_string != '' ){ //If input is not empty
        window.location.href = (`/client/rfc/${rfc_string}`); //Go to route /client/rfc/:rfc
    }else{ //If not
        window.location.href = (`/client/`); //Go back to clients section
    }

}

//Add the event handler for the creation form submission
addClientForm.addEventListener('submit', newClientHandler);

//Add the event handler for the update form submission
modifyClient.addEventListener('submit', updateClientHandler);

//Add event handler for delete buttons
for (let i = 0; i < deleteClients.length; i++){
    deleteClients[i].addEventListener('click', deleteClientHandler);
}

// Add event handler for search bar
searchClients.addEventListener('click', searchClientHandler);