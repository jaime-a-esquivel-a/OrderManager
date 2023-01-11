const addUserForm = document.getElementById('addUser-form'); //Get form that allows user creation
const modifyUser = document.getElementById('TableUser'); //Get table that contains all users
const deleteUsers = document.getElementsByClassName('deleteUser'); //Get delete buttons for users
const searchUser = document.getElementById('btnSearch'); //Get search button of users section

//Function to create a new user
async function newUserHandler(event){
    event.preventDefault();
    const newUserFN = document.getElementById('inputFirstName').value; //Get First Name for user creation
    const newUserLN = document.getElementById('inputLastName').value; //Get Last Name for user creation
    const newUserEmail = document.getElementById('inputEmail').value; //Get Email for user creation
    const newUserTel = document.getElementById('inputTel').value; //Get Telephone for user creation
    const newUserPwd = document.getElementById('inputPassword').value; //Get Password for user creation
    const newUserSuper= document.getElementById('inputSuper').checked; //Get Super user boolean for user creation

    const response = await fetch( '/api/users', { //Fetch /api/users with POST method to create a new user
        method: 'POST',
        body: JSON.stringify({ //Send body with all data
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

    if(response.ok){ //If response was ok
        document.location.replace('/api/users'); //Go back to users section
    }else{ //If not
        alert('Error when creating user'); //Send alert
    }

}

//Function to update user
async function updateUserHandler(event){
    event.preventDefault();
    const index = event.target.dataset.index; //Get index of the user to be updated
    if (event.target.matches(".UpdateUser")) {
        const updateUserFN = document.getElementById(`inputFirstName-${index}`).value; //Get First Name for user update
        const updateUserLN = document.getElementById(`inputLastName-${index}`).value; //Get Last Name for user update
        const updateUserEmail = document.getElementById(`inputEmail-${index}`).value; //Get Email for user update
        const updateUserTel = document.getElementById(`inputTel-${index}`).value; //Get Telephone for user update
        const updateUserPass = document.getElementById(`inputPassword-${index}`).value; //Get Password for user update
        const updateUserSuper= document.getElementById(`inputSuper-${index}`).checked; //Get Super user value for user update
        let updateData;

        if (updateUserPass !== ""){ //If password was introduced for update
            updateData = { //Build request body with password 
                first_name : updateUserFN,
                last_name: updateUserLN,
                email: updateUserEmail,
                tel: updateUserTel,
                password: updateUserPass,
                superuser: updateUserSuper,
                }
        } else { //If password was not introduced
            updateData = { //Build request body without password 
                first_name : updateUserFN,
                last_name: updateUserLN,
                email: updateUserEmail,
                tel: updateUserTel,
                superuser: updateUserSuper,
                }
        }
        
        const response = await fetch( `/api/users/${updateUserEmail}`, { //Fetch /api/users/:email with PUT method to update user
            method: 'PUT',
            body: JSON.stringify(updateData), //Send body with all data
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){ //If response was ok
            document.location.replace('/api/users'); //Go back to users section
        }else{ //If not
            alert('Error when updating user'); //Send alert
        }

    } 
}

//Function to delete user
async function deleteUserHandler(event) {
    const index = event.target.dataset.index; //Get index of the user to be deleted
    let deleteEmail = document.getElementById(`EmailValue-${index}`).innerText.trim(); //Get the email of the user to be deleted
    const response = await fetch( `/api/users/${deleteEmail}`, { //Fetch /api/users/:email with DELETE method to delete user
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){ //If response was ok
        document.location.replace('/api/users'); //Go back to users section
    }else{ //If not
        alert('Error when deleting user'); //Send alert
    } 
}

//Function to search user
async function searchUserHandler(event) {

    event.preventDefault();
    const email_string = document.getElementById('inputSearch').value; //Get data for search
    window.location.href = (`/api/users/${email_string}`); //Go to /api/users/:email to bring users that match

}


//Add the event handler for the creation form submission
addUserForm.addEventListener('submit', newUserHandler);

//Add the event handler for the update form submission
modifyUser.addEventListener('submit', updateUserHandler);

//Add event handler for delete buttons
for (let i = 0; i < deleteUsers.length; i++){
    deleteUsers[i].addEventListener('click', deleteUserHandler);
}

// Add event handler for search bar
searchUser.addEventListener('click', searchUserHandler);