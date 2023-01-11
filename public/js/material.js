const addMaterialForm = document.getElementById('addMaterial-form'); //Get form that allows material creation
const modifyMaterial = document.getElementById('TableMat'); //Get table that contains all materials
const deleteMaterials = document.getElementsByClassName('deleteMaterial'); //Get delete buttons for materials
const searchMaterials = document.getElementById('btnSearch'); //Get search button of materials section

//Function to create a material
async function newMaterialHandler(event){
    event.preventDefault();

    const newMaterialSKU = document.getElementById('inputMaterialSKU').value; //Get SKU for material creation
    const newMaterialDesc = document.getElementById('inputDescMat').value; //Get Description for material creation
    const newMaterialStock = document.getElementById('inputStockMat').value; //Get Stock for material creation
    const newMaterialUom = document.getElementById('inputUomMat').value; //Get Unit of Measure for material creation
    const newMaterialPrice = document.getElementById('inputPriceMat').value; //Get Price for material creation

    const response = await fetch( '/material', { //Fetch /material with POST method to create a new material
        method: 'POST',
        body: JSON.stringify({ //Send body with data
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

    if(response.ok){ //If response was ok 
        document.location.replace('/material'); //Go to materials section
    }else{ //If not
        alert('Error when creating material'); //Send alert
    }

}

//Function to update a material
async function updateMaterialHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index; //Get index of material to be updated
    if (event.target.matches(".UpdateMaterial")) {
        const updateMaterialSKU = document.getElementById(`inputMaterialSKU-${index}`).value; //Get SKU for material update
        const updateMaterialDesc = document.getElementById(`inputDescMat-${index}`).value; //Get Description for material update
        const updateMaterialStock = document.getElementById(`inputStockMat-${index}`).value; //Get Stock for material update
        const updateMaterialUom = document.getElementById(`inputUomMat-${index}`).value; //Get Unit of Measure for material update
        const updateMaterialPrice = document.getElementById(`inputPriceMat-${index}`).value; //Get Price for material update

        const response = await fetch( `/material/${updateMaterialSKU}`, { //Fetch /material/:sku with PUT method to update a material
            method: 'PUT',
            body: JSON.stringify({ //Send body with all data
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

        if(response.ok){ //If response was ok
            document.location.replace('/material'); //Go back to materials section
        }else{ //If not
            alert('Error when updating material'); //Send alert
        }

    } 
}

//Function to delete a material
async function deleteMaterialHandler(event) {
    const index = event.target.dataset.index; //Get index of the material to be deleted
    let deleteSKU = document.getElementById(`SKUvalue-${index}`).innerText; //Get SKU of material to be deleted
     const response = await fetch( `/material/${deleteSKU}`, { //Fetch /material/:sku with DELETE method to delete a material
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){ //If response was ok
        document.location.replace('/material'); //Go to materials section
    }else{ //If not
        alert('Error when deleting material'); //Send alert
    }
}

//Function to search a material
async function searchMaterialHandler(event) {

    event.preventDefault();
    const sku_string = document.getElementById('inputSearch').value; //Get data to search
    window.location.href = (`/material/${sku_string}`); //Go to /material/:sku
    /*const response = await fetch(`/material/${sku_string}`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    if(response.ok){
        document.location.replace(`/material/${sku_string}`);
    }else{
        alert('Error when searching material');
    }*/
}


// Add the event handler for the creation form submission
addMaterialForm.addEventListener('submit', newMaterialHandler);

// Add the event handler for the update form submission
modifyMaterial.addEventListener('submit', updateMaterialHandler);

//Add event handler for all delete buttons
for (let i = 0; i < deleteMaterials.length; i++){
    deleteMaterials[i].addEventListener('click', deleteMaterialHandler);
}

// Add event handler for search bar
searchMaterials.addEventListener('click', searchMaterialHandler);