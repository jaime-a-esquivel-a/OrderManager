const searchMaterials = document.getElementById('btnSearch');
const tabMaterials = document.getElementById('addMatTab');
const lstMaterials = document.getElementById('lstMat');

/*
- When order info is loaded calculateTotal() is called to calculate order balance which is a dynamic value of the screen.
*/
window.onload = function () {

    calculateTotal();

}

/* 
- Function to get the string entered by user in search bar.
- Searches the value entered against SKU for materials in DB.
- Returns a list of potential matches of the search displaye when calling 'displayMaterials(materials)'.
*/
async function searchMaterialHandler(event) {

    event.preventDefault();

    const sku_string = document.getElementById('inputSearch').value;

    if (sku_string == ''){
        return;
    }

    const response = await fetch(`/order/materials/${sku_string}`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    let materials = await response.json();

    displayMaterials(materials);
}

/*
- Retrieves data for selected material in search results,
- moves material to document list as an item of the order when calling 'addMat(material)'.
*/
async function selectMaterial(idMaterial) {

    tabMaterials.innerHTML = '';

    if(!addIdMaterial(idMaterial)){
        return;
    }

    const response = await fetch(`/order/onemat/${idMaterial}`, {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

    });

    let material = await response.json();
    
    addMat(material);

}

/*
- Creates dinamically HTML objects to display the search results when user enters a string in the search bar.
*/
function  displayMaterials(arrMaterials){
    tabMaterials.innerHTML = '';

    // following code create table header:
    var _thead = document.createElement('thead');           //<thead class="table-light">
    _thead.className = 'table-light';                       //  <tr>              
    var _tr = document.createElement('tr');                 //      <th scope="col">SKU</th>            
    var _th1 = document.createElement('th');                //      <th scope="col">Description</th>                  
    _th1.scope= 'col';                                      //      <th scope="col">Price</th>               
    var _th2 = document.createElement('th');                //      <th scope="col">Option</th>                 
    _th2.scope= 'col';                                      //  <tr>
    var _th3 = document.createElement('th');                //</thead>
    _th3.scope= 'col'; 
    var _th4 = document.createElement('th');                
    _th4.scope= 'col'; 
    _th1.textContent = 'SKU';
    _th2.textContent = 'Description';
    _th3.textContent = 'Price';
    tabMaterials.append(_thead);
    _thead.append(_tr);
    _tr.append(_th1);
    _tr.append(_th2);
    _tr.append(_th3);
    _tr.append(_th4);

    // following code creates row for every found material      
    var _tbody = document.createElement('tbody');            //<tbody>          
    tabMaterials.append(_tbody);                             // <tr>
                                                             //     <td>...sku...</td>
    arrMaterials.forEach(material => {                       //     <td>...desc...</td>
                                                             //     <td>...price...</td>
        var _tr = document.createElement('tr');              //     <td>...<button>...</td>
        var _td1 = document.createElement('td');             // </tr>
        var _td2 = document.createElement('td');             //</tbody> 
        var _td3 = document.createElement('td');
        var _td4 = document.createElement('td');
        
        _tbody.append(_tr);
        _td1.textContent = material.sku;
        _tr.append(_td1);
        _td2.textContent = material.description;
        _tr.append(_td2);
        _td3.textContent = material.price;
        _tr.append(_td3);
        _td4.innerHTML = `<button type="button" class="btn btn-primary fa-xs" id="btnAdd-${material.id}" onclick="selectMaterial(${material.id})"><i class="fa-solid fa-circle-plus"></i></button>`;
        _tr.append(_td4);
        
    });

}

/*
- Creates dinamically HTML objects to display the selected item from search bar and passes it to item list of the order.
- At the end call 'calculateTotal()' to recalculate the order balance with the recently added item value.
*/
function addMat(myMaterial){

    tabMaterials.innerHTML = '';

    var _divrow = document.createElement('div');
    _divrow.className = 'row';
    _divrow.id = `row-${myMaterial.id}`;

    var _divinfo = document.createElement('div');
    _divinfo.className = 'col-lg-5 col-md-12 col-sm12 mb-4 mb-lg-0 text-lg-center';
    var _p1 = document.createElement('p');
    _p1.className = 'my-0';
    var _strong1 = document.createElement('strong');
    _strong1.textContent = myMaterial.description;
    var _p2 = document.createElement('p');
    _p2.className = 'my-0';
    _p2.textContent = 'SKU:' + myMaterial.sku;
    var _p3 = document.createElement('p');
    _p3.className = 'my-0';
    _p3.textContent = 'STOCK:' + myMaterial.stock;
    var _p4 = document.createElement('p');
    _p4.className = 'my-0';
    _p4.textContent = 'UoM:' + myMaterial.uom;

    lstMaterials.append(_divrow);
    _divrow.append(_divinfo);
    _divinfo.append(_p1);
    _p1.append(_strong1);
    _divinfo.append(_p2);
    _divinfo.append(_p3);
    _divinfo.append(_p4);

    var _divqty = document.createElement('div');
    _divqty.className = 'col-lg-3 col-md-12 mb-4 mb-lg-0 text-md-center text-sm-center';
    var _p4 = document.createElement('p');
    var _strong4 = document.createElement('strong');
    _strong4.textContent = 'Quantity';
    _divqty2 = document.createElement('div');
    _divqty2.className = 'd-flex flex-row justify-content-md-center';
    _btnminus = document.createElement('button');
    _btnminus.className = 'btn btn-link px-2';
    _btnminus.onclick = function(){
                            this.parentNode.querySelector('input[type=number]').stepDown();
                            calculateTotal();
                        };
    _iminus = document.createElement('i');
    _iminus.className = 'fas fa-minus';
    _inputqty = document.createElement('input');
    _inputqty.id = `qty-${myMaterial.id}`;
    _inputqty.min = '1';
    _inputqty.value = '1';
    _inputqty.className = 'form-control form-control-sm';
    _inputqty.type = 'number';
    _inputqty.style = 'width: 60px;';
    _inputqty.oninput = function(){
                            calculateTotal();
                        }
    _inputqty.onclick = function(){
                            calculateTotal();
                        };
    _btnplus = document.createElement('button');
    _btnplus.className = 'btn btn-link px-2';
    _btnplus.onclick = function(){
                            this.parentNode.querySelector('input[type=number]').stepUp();
                            calculateTotal();
                        };
    _iplus = document.createElement('i');
    _iplus.className = 'fas fa-plus';

    _divrow.append(_divqty);
    _divqty.append(_p4);
    _p4.append(_strong4);
    _divqty.append(_divqty2);
    _divqty2.append(_btnminus);
    _btnminus.append(_iminus);
    _divqty2.append(_inputqty);
    _divqty2.append(_btnplus);
    _btnplus.append(_iplus);

    var _divprc = document.createElement('div');
    _divprc.className = 'col-lg-3 col-md-6 mb-1 mb-lg-0 text-md-center';
    var _p5 = document.createElement('p');
    var _strong5 = document.createElement('strong');
    _strong5.textContent = 'Price';
    var _p6 = document.createElement('p');
    _p6.id = `prc-${myMaterial.id}`;
    _p6.dataset.value = `${myMaterial.price}`;
    _p6.textContent = `$ ${myMaterial.price}`;

    _divrow.append(_divprc);
    _divprc.append(_p5);
    _p5.append(_strong5);
    _divprc.append(_p6);

    var _divdel = document.createElement('div');
    _divdel.className = 'col-lg-1 col-md-12 mb-1 text-md-center';
    _btndel = document.createElement('button');
    _btndel.type = 'button';
    _btndel.className = 'btn btn-danger btn-md mt-3';
    _btndel.onclick = function () { 
                                    document.getElementById(`row-${myMaterial.id}`).remove(); 
                                    lstMat.splice(lstMat.indexOf(myMaterial.id), 1 );
                                    calculateTotal();
                                };
    //_btndel.onclick = removeIdMaterial(myMaterial.id);
    _btndel.style = 'font-size:auto;';
    _btndel.title = 'Remove item';
    _i2 = document.createElement('i');
    _i2.className = 'fas fa-trash';
    _btndel.onclick

    _divrow.append(_divdel);
    _divdel.append(_btndel);
    _btndel.append(_i2);

    calculateTotal();

}

/*
- Checks if a given material is already part of the order items.
- makes use of global var lstMat which holds the IDs of the items which are part of the order.
- If a given material is already part of the order, prevents adding it twice.
*/
function addIdMaterial(idMaterial){

    if(lstMat.includes(idMaterial)){
        return false;
    }

    lstMat.push(idMaterial);
    return true;  
}

/*
- Checks screen is ready for submission to update an order.
- Assembles JSON object to send it to order update end point.
- handles response & re-directs user to orders list screen.
*/
async function updateOrder(idOrder){

    if (document.getElementById('inputClient').value == 0){
        alert('Please select a Client for your order.');
        return;
    }

    if (lstMat.length == 0){
        alert('Please add at least one product to your order.');
        return;
    }

    const itmArr = [];

    lstMat.forEach(material => {  

        const itmObj = {
            order_id: idOrder,
            material_id: material,
            qty: document.getElementById(`qty-${material}`).value,
            price: document.getElementById(`prc-${material}`).dataset.value,
        };

        itmArr.push(itmObj);

    });

    const response = await fetch(`/order/${idOrder}`, {
        method: 'PUT',
        body: JSON.stringify({
            items: itmArr,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/order/header');
    }else{
        alert('Error when creating order');
    }

}

/*
- Walks through global var 'LstMat' which holds the IDs of the items contained in the order to calculate the balance of the order.
- This function is called from several points in the code, since there are different actions that can trigger a recalculation of the order balance.
*/
function calculateTotal(){

    let price = 0;
    let qty = 0;
    let total = 0;

    lstMat.forEach(material => { 

        const txtcnt = document.getElementById(`prc-${material}`).textContent.split(' ');

        price = txtcnt[1];
        qty = document.getElementById(`qty-${material}`).value;

        total = total + (price * qty);

    });

    document.getElementById('orderTotal').textContent = '$ ' + total.toFixed(2);

}

/*
- Deletes material form items list of the order.
- Deletes ID of material from global var 'lstMat'.
- Calls 'calculateTotal()' to recalculate the balance of the order'.
*/
function deleteItm(matId) { 

    document.getElementById(`row-${matId}`).remove(); 
    lstMat.splice(lstMat.indexOf(matId), 1 );
    calculateTotal();

};

/*
- Add event handler for search bar
*/
searchMaterials.addEventListener('click', searchMaterialHandler);