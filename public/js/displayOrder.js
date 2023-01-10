window.onload = function () {
    calculateTotal();
}

function calculateTotal(){

    let price = 0;
    let qty = 0;
    let total = 0;

    lstMat.forEach(material => { 

        price = document.getElementById(`prc-${material}`).dataset.value;
        qty = document.getElementById(`qty-${material}`).dataset.value;

        total = total + (price * qty);

    });

    document.getElementById('orderTotal').textContent = '$ ' + total;

}