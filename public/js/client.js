const addClientForm = document.getElementById('addClient-form');
const modifyClient = document.getElementById('TableClient');
const deleteClients = document.getElementsByClassName('deleteClient');
const searchClients = document.getElementById('btnSearch');

async function newClientHandler(event){

    event.preventDefault();

    const newClientRFC = document.getElementById('inputRFC').value;
    const newClientActive = document.getElementById('inputActive').checked;
    const newClientName = document.getElementById('inputClientName').value;
    const newClientEmail = document.getElementById('inputClientEmail').value;
    const newClientTel = document.getElementById('inputClientTel').value;
    const newClientAddress = document.getElementById('inputClientAddress').value;

    const response = await fetch( '/client', {
        method: 'POST',
        body: JSON.stringify({
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

    if(response.ok){
        document.location.replace('/client');
    }else{
        alert('Error when creating client');
    }


}

async function updateClientHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index;
    if (event.target.matches(".UpdateClient")) {
        const updateClientRFC = document.getElementById(`inputRFC-${index}`).value;
        const updateClientActive = document.getElementById(`inputActive-${index}`).checked;
        const updateClientName = document.getElementById(`inputClientName-${index}`).value;
        const updateClientEmail = document.getElementById(`inputClientEmail-${index}`).value;
        const updateClientTel = document.getElementById(`inputClientTel-${index}`).value;
        const updateClientAddress = document.getElementById(`inputClientAddress-${index}`).value;


        const response = await fetch( `/client/${updateClientRFC}`, {
            method: 'PUT',
            body: JSON.stringify({
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

        if(response.ok){
            document.location.replace('/client');
        }else{
            alert('Error when updating client');
        }

    } 
}

async function deleteClientHandler(event) {
    const index = event.target.dataset.index;
    let deleteRFC = document.getElementById(`RFCvalue-${index}`).innerText;
    const response = await fetch( `/client/${deleteRFC}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/client');
    }else{
        alert('Error when deleting client');
    }
}

async function searchClientHandler(event) {

    event.preventDefault();
    const rfc_string = document.getElementById('inputSearch').value;

    if (rfc_string != '' ){
        window.location.href = (`/client/rfc/${rfc_string}`);
    }else{
        window.location.href = (`/client/`);
    }

}

// Add the event handler for the form submission
addClientForm.addEventListener('submit', newClientHandler);

// Add the event handler for the form submission
modifyClient.addEventListener('submit', updateClientHandler);


for (let i = 0; i < deleteClients.length; i++){
    deleteClients[i].addEventListener('click', deleteClientHandler);
}

// Add event handler for search bar
searchClients.addEventListener('click', searchClientHandler);