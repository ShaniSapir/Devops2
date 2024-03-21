document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();
      // Get form data
      const idCard = document.getElementById("idCard").value;
      const password = document.getElementById("password").value;
    
      // Validate form data (You can add more validations as needed)
      if (!idCard || !password) {
        displayError("Please fill in all fields.");
        return;
      }
    
      // Check if user exists in local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.idCard === idCard && u.password === password);
    
      if (user) {
        // Store the user data in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));
    
        // Redirect based on user type
        if (user.role === "student") {
          window.location.href = "students.html";
        } else if (user.role === "lecturer") {
          window.location.href = "teachers.html";
        }
      } else {
        displayError("One of the inputs is incorrect. Please try again.");
      }
  });

  function displayError(message) {
      const errorElement = document.getElementById("error");
      errorElement.textContent = message;
  }
});