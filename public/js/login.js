const loginFormHandler = async (event) => {

    event.preventDefault();

    const email = document.querySelector('#loginUser').value.trim();
    console.log(email);
    const password = document.querySelector('#loginPass').value.trim();
    console.log(password);

    if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
          alert('Failed to log in.');
        }
      }

};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);