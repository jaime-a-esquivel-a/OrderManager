window.onload = function () { //When loading window
    calculateTotal(); //Call function to calculate total of order
}

function calculateTotal(){
    //Initialize variables
    let price = 0;
    let qty = 0;
    let total = 0;

    lstMat.forEach(material => { //Loop over each material in order

        price = document.getElementById(`prc-${material}`).dataset.value; //Get price of each material
        qty = document.getElementById(`qty-${material}`).dataset.value; //Get quantity of each material

        total = total + (price * qty); //Calculate total

    });

    document.getElementById('orderTotal').textContent = '$ ' + total; //Place total in the corresponding element in view

}