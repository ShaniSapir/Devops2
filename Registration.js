document.addEventListener("DOMContentLoaded", function () {
  const errorElement = document.getElementById("errorLabel");
  const successfulElement = document.getElementById("registratinSuccessful");

  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Debugging: Log a message when the form is submitted
      console.log("Form submitted");

      // Validate inputs
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value.trim();
      const idCard = document.getElementById("idCard").value.trim();
      const password = document.getElementById("password").value.trim();

      // Regular expressions for validation
      const nameRegex = /^[A-Za-z]{1,20}$/;
      const idCardRegex = /^[0-9]{9}$/;
      const passwordRegex = /^.{9}$/;

      let isValid = true;

      if (
        !nameRegex.test(firstName) ||
        !nameRegex.test(lastName) ||
        !idCardRegex.test(idCard) ||
        !passwordRegex.test(password)
      ) {
        isValid = false;
      }

      // Check if ID card already exists
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (existingUsers.some((user) => user.idCard === idCard)) {
        displayError(
          "ID Card number already exists. Please use a different one."
        );
        isValid = false;
      }

      if (!isValid) {
        
      

      // If all inputs are valid, proceed with registration
      const formData = new FormData(event.target);
      const userData = {
        firstName,
        lastName,
        idCard,
        password,
        role: formData.get("role"),
        course: formData.get("course") || null,
      };

      // Add the new user to existing users
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Clear any previous error message
      clearError();

      // Display successful registration message
      displaySuccessful("Registration successful!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }
    });
  
  // Clear error message function
  function clearError() {
    errorElement.textContent = "";
  }

  // Display error message function
  function displayError(message) {
    errorElement.textContent = message;
  }

  // Display successful message function
  function displaySuccessful(message) {
    successfulElement.textContent = message;
  }
});
