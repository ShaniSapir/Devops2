document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    idCard: formData.get("idCard"),
    password: formData.get("password"),
    role: formData.get("role"),
    course: formData.get("course") || null
  };

  // Send form data to backend
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        return response.json().then(error => {
          alert("Error: " + error.message);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred. Please try again later.");
    });
});
