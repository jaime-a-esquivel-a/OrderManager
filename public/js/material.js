const addMaterialForm = document.getElementById('addMaterial-form');
const modifyMaterial = document.getElementById('TableMat');
const deleteMaterials = document.getElementsByClassName('deleteMaterial');

async function newMaterialHandler(event){
    event.preventDefault();

    const newMaterialSKU = document.getElementById('inputMaterialSKU').value;
    const newMaterialDesc = document.getElementById('inputDescMat').value;
    const newMaterialStock = document.getElementById('inputStockMat').value;
    const newMaterialUom = document.getElementById('inputUomMat').value;
    const newMaterialPrice = document.getElementById('inputPriceMat').value;

    const response = await fetch( '/material', {
        method: 'POST',
        body: JSON.stringify({
            sku : newMaterialSKU,
            description : newMaterialDesc,
            stock : newMaterialStock,
            uom : newMaterialUom,
            price : newMaterialPrice
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/material');
    }else{
        alert('Error when creating material');
    }

}

async function updateMaterialHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index;
    if (event.target.matches(".UpdateMaterial")) {
        const updateMaterialSKU = document.getElementById(`inputMaterialSKU-${index}`).value;
        const updateMaterialDesc = document.getElementById(`inputDescMat-${index}`).value;
        const updateMaterialStock = document.getElementById(`inputStockMat-${index}`).value;
        const updateMaterialUom = document.getElementById(`inputUomMat-${index}`).value;
        const updateMaterialPrice = document.getElementById(`inputPriceMat-${index}`).value;

        const response = await fetch( `/material/${updateMaterialSKU}`, {
            method: 'PUT',
            body: JSON.stringify({
                sku : updateMaterialSKU,
                description : updateMaterialDesc,
                stock : updateMaterialStock,
                uom : updateMaterialUom,
                price : updateMaterialPrice,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            document.location.replace('/material');
        }else{
            alert('Error when updating material');
        }

    } 
}

async function deleteMaterialHandler(event) {
    const index = event.target.dataset.index;
    let deleteSKU = document.getElementById(`SKUvalue-${index}`).innerText;
     const response = await fetch( `/material/${deleteSKU}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/material');
    }else{
        alert('Error when deleting material');
    }
}


// Add the event handler for the form submission
addMaterialForm.addEventListener('submit', newMaterialHandler);

// Add the event handler for the form submission
modifyMaterial.addEventListener('submit', updateMaterialHandler);


for (let i = 0; i < deleteMaterials.length; i++){
    deleteMaterials[i].addEventListener('click', deleteMaterialHandler);
}