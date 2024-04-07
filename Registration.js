document.addEventListener("DOMContentLoaded", function () {
  const errorElement = document.getElementById("errorLabel");
  clearError();

  document
    .getElementById("registrationForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Initialize isValid variable every time the form is submitted
      let isValid = true;
      // Debugging: Log a message when the form is submitted
      //console.log("Form submitted");

      // Validate inputs
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value.trim();
      const idCard = document.getElementById("idCard").value.trim();
      const password = document.getElementById("password").value.trim();

      // Regular expressions for validation
      const nameRegex = /^[A-Za-z]{1,20}$/;
      const idCardRegex = /^[0-9]{9}$/;
      const passwordRegex = /^.{9}$/;

      

      if (
        !nameRegex.test(firstName) ||
        !nameRegex.test(lastName) ||
        !idCardRegex.test(idCard) ||
        !passwordRegex.test(password)
      ) {
        isValid = false;
      }

      if (!isValid) {
        displayError("One of the details entered is invalid, please try again");
        return;
      }
      clearError();

      // Check if the identity certificate already exists in the database
      fetch("/check-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idCard }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error checking ID");
          }
        })
        .then((data) => {
          if (data.exists) {
            displayError("This ID already exists");
          } else {
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

            // Send form data to backend
            fetch("/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            })
              .then((response) => {
                if (response.ok) {
                  window.location.href = "login.html"; // Redirect to login page
                } else {
                  return response.json().then((error) => {
                    alert("Error: " + error.message);
                  });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });

  // Clear error message function
  function clearError() {
    errorElement.textContent = "";
  }

  // Display error message function
  function displayError(message) {
    //console.log("Displaying error message:", message); // Debugging: Log the error message being displayed
    errorElement.textContent = message;
  }
});
