const addUserForm = document.getElementById('addUser-form');

async function newUserHandler(event){

    event.preventDefault();

    const newUserFN = document.getElementById('inputFirstN').value;
    const newUserLN = document.getElementById('inputLastN').value;
    const newUserEmail = document.getElementById('inputEmail').value;
    const newUserTel = document.getElementById('inputTel').value;
    const newUserPwd = document.getElementById('inputPassword').value;

    console.log(newUserFN);

    const response = await fetch( '/api/users', {
        method: 'POST',
        body: JSON.stringify({
            first_name : newUserFN,
            last_name: newUserLN,
            email: newUserEmail,
            tel: newUserTel,
            password: newUserPwd
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

// Add the event handler for the form submission
addUserForm.addEventListener('submit', newUserHandler);