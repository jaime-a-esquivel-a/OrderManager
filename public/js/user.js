const addUserForm = document.getElementById('addUser-form');
const modifyUser = document.getElementById('TableUser');
const deleteUsers = document.getElementsByClassName('deleteUser');
const searchUser = document.getElementById('btnSearch');

async function newUserHandler(event){

    event.preventDefault();

    const newUserFN = document.getElementById('inputFirstName').value;
    const newUserLN = document.getElementById('inputLastName').value;
    const newUserEmail = document.getElementById('inputEmail').value;
    const newUserTel = document.getElementById('inputTel').value;
    const newUserPwd = document.getElementById('inputPassword').value;
    const newUserSuper= document.getElementById('inputSuper').checked;

    const response = await fetch( '/api/users', {
        method: 'POST',
        body: JSON.stringify({
            first_name : newUserFN,
            last_name: newUserLN,
            email: newUserEmail,
            tel: newUserTel,
            password: newUserPwd,
            superuser: newUserSuper,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){
        document.location.replace('/api/users');
    }else{
        alert('Error when creating user');
    }

}

async function updateUserHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index;
    if (event.target.matches(".UpdateUser")) {
        const updateUserFN = document.getElementById(`inputFirstName-${index}`).value;
        const updateUserLN = document.getElementById(`inputLastName-${index}`).value;
        const updateUserEmail = document.getElementById(`inputEmail-${index}`).value;
        const updateUserTel = document.getElementById(`inputTel-${index}`).value;
        const updateUserPass = document.getElementById(`inputPassword-${index}`).value;
        const updateUserSuper= document.getElementById(`inputSuper-${index}`).checked;
        let updateData;

        if (updateUserPass !== ""){
            updateData = {
                first_name : updateUserFN,
                last_name: updateUserLN,
                email: updateUserEmail,
                tel: updateUserTel,
                password: updateUserPass,
                superuser: updateUserSuper,
                }
        } else {
            updateData = {
                first_name : updateUserFN,
                last_name: updateUserLN,
                email: updateUserEmail,
                tel: updateUserTel,
                superuser: updateUserSuper,
                }
        }
        
        const response = await fetch( `/api/users/${updateUserEmail}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            document.location.replace('/api/users');
        }else{
            alert('Error when updating user');
        }

    } 
}

async function deleteUserHandler(event) {
    const index = event.target.dataset.index;
    let deleteEmail = document.getElementById(`EmailValue-${index}`).innerText.trim();
    const response = await fetch( `/api/users/${deleteEmail}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
        document.location.replace('/api/users');
    }else{
        alert('Error when deleting user');
    }
}

async function searchUserHandler(event) {

    event.preventDefault();
    const email_string = document.getElementById('inputSearch').value;
    window.location.href = (`/api/users/${email_string}`);

}


// Add the event handler for the form submission
addUserForm.addEventListener('submit', newUserHandler);

// Add the event handler for the form submission
modifyUser.addEventListener('submit', updateUserHandler);

for (let i = 0; i < deleteUsers.length; i++){
    deleteUsers[i].addEventListener('click', deleteUserHandler);
}

// Add event handler for search bar
searchUser.addEventListener('click', searchUserHandler);