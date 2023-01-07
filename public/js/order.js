const deleteOrders = document.getElementsByClassName('deleteOrder');
const nextStatusBtn = document.getElementsByClassName('nextStatus');
const searchOrders = document.getElementById('btnSearch');

async function deleteOrderHandler(event){
    const orderId = event.target.dataset.index;
    const response = await fetch( `/order/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/order/header');
    }else{
        alert('Error when deleting client');
    }
}

async function nextStatusHandler(event){
    const orderId = event.target.dataset.index;
    const statusEl = document.getElementById(`status-${orderId}`);
    const statusId = statusEl.dataset.value;
    console.log(statusId);
    const response = await fetch( `/order/updatestatus/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({
            status_id : statusId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/order/header');
    }else{
        alert('Error when changing status for order');
    }
}

for (let i = 0; i < deleteOrders.length; i++){
    deleteOrders[i].addEventListener('click', deleteOrderHandler);
}

for (let i = 0; i < nextStatusBtn.length; i++){
    nextStatusBtn[i].addEventListener('click', nextStatusHandler);
}

async function searchOrderHandler(event) {

    event.preventDefault();
    const id_status = document.getElementById('inputStatus').value;

    if (id_status != '' ){
        window.location.href = (`/order/status/${id_status}`);
    }else{
        window.location.href = (`/order/header/`);
    }

}

// Add event handler for search bar
searchOrders.addEventListener('click', searchOrderHandler);