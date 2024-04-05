document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idCard = document.getElementById("idCard").value;
    const password = document.getElementById("password").value;

    if (!idCard || !password) {
      displayError("Please fill in all fields.");
      return;
    }

    // Send login request to the server
    fetch('/login.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idCard, password })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(error => {
            throw new Error(error.message);
          });
        }
      })
      .then(user => {
        // Display personalized message
        const greetingElement = document.getElementById("greeting");
        greetingElement.textContent = `Hi ${user.role} ${user.firstName} ${user.lastName}!`;
      })
      .catch(error => {
        displayError(error.message);
      });
  });

  function displayError(message) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = message;
  }
});
