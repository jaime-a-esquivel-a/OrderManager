//Function to perform logout
const logout = async () => {
    const response = await fetch('/api/users/logout', { //Fetch /api/users/logout with POST method to logout
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) { //If response was ok
      document.location.replace('/'); //Go back to Home
    } else { //If not
      alert('Failed to log out.'); //Send alert
    }
  };
  
  //Add event handler when clicking logout button
  document.querySelector('#btnLogout').addEventListener('click', logout);
  