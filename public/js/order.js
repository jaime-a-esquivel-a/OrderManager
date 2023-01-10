const deleteOrders = document.getElementsByClassName('deleteOrder'); //Get delete buttons for orders
const nextStatusBtn = document.getElementsByClassName('nextStatus'); //Get next status buttons for orders
const searchOrders = document.getElementById('btnSearch'); //Get search button of orders section

//Function to delete order
async function deleteOrderHandler(event){
    const orderId = event.target.dataset.index; //Get index of the order to be deleted
    const response = await fetch( `/order/${orderId}`, { //Fetch /order/:id with DELETE method to delete order
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){ //If response was ok 
        document.location.replace('/order/header'); //Go back to orders section
    }else{ //If not
        alert('Error when deleting client'); //Send alert
    }
}

//Function to move status of the order
async function nextStatusHandler(event){
    const orderId = event.target.dataset.index; //Get the index of the order to modify its status
    const statusEl = document.getElementById(`status-${orderId}`); //Get the element where the order status id is placed
    const statusId = statusEl.dataset.value; //Get the actual order status id
    const response = await fetch( `/order/updatestatus/${orderId}`, { //Fetch /order/updatestatus/:id with PUT method to move order status to the next
        method: 'PUT',
        body: JSON.stringify({
            status_id : statusId, //Send actual status id of the order
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){ //If response was ok
        document.location.replace('/order/header'); //Go back to orders section
    }else{ //If not
        alert('Error when changing status for order'); //Send alert
    }
}

//Function to search order
async function searchOrderHandler(event) {

    event.preventDefault();
    const id_status = document.getElementById('inputStatus').value; //Get the data introduced in the search field

    if (id_status != '' ){ //If data was introduced
        window.location.href = (`/order/status/${id_status}`); //Go to /order/status/:id to find orders by status id
    }else{ //If not
        window.location.href = (`/order/header/`); //Go back to orders section
    }

}

//Add event handler for delete buttons
for (let i = 0; i < deleteOrders.length; i++){
    deleteOrders[i].addEventListener('click', deleteOrderHandler);
}

//Add event handler for next status buttons
for (let i = 0; i < nextStatusBtn.length; i++){
    nextStatusBtn[i].addEventListener('click', nextStatusHandler);
}

// Add event handler for search bar
searchOrders.addEventListener('click', searchOrderHandler);