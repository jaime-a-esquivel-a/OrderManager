//Function to perform login
const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#loginUser').value.trim(); //Get email introduced by user
    const password = document.querySelector('#loginPass').value.trim(); //Get password introduced by user

    if (email && password) { //If both parameters were provided
        const response = await fetch('/api/users/login', { //Fetch /api/users/login with POST method to login to application
          method: 'POST',
          body: JSON.stringify({ email, password }), //Send body with parameters
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) { //If response was ok
            document.location.replace('/'); //Go to Home
        } else { //If not
          alert('Failed to log in.'); //Send alert
        }
      }

};

//Add event handler when submitting login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);