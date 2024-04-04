document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    idCard: formData.get("idCard"),
    password: formData.get("password"),
    role: formData.get("role"),
    course: formData.get("course") || null,
    mathematics: 0,
    physics: 0,
    english: 0
  };
  
  localStorage.setItem('userData', JSON.stringify(userData));
  

  if (validateUserData(userData)) {
    registerUser(userData);
    alert("Registration successful!");
    window.location.href = "login.html"; // Redirect to login page
  } else {
    alert("One of the inputs is incorrect. Please check and try again.");
  }
});

function validateUserData(userData) {
  if (!/^[a-zA-Z]{1,20}$/.test(userData.firstName)) {
    console.log("firstName", userData.firstName)
    return false;
  }

// Validation for last name
  if (!/^[a-zA-Z]{1,20}$/.test(userData.lastName)) {
    console.log("lastName")
    return false;
  }
  if (userData.idCard.length !== 9 || isNaN(userData.idCard)) return false;
  if (userData.password.length < 6 || userData.password.length > 10) return false;

  // Check if ID card already exists in the system
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  var userExists = existingUsers.some(user => user.idCard === userData.idCard);
  if (userExists) {
    alert("User with the same ID card already exists.");

    return false;
  }
  // You can add more validation rules here if needed
  return true;
}

function registerUser(userData) {
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  existingUsers.push(userData);
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

// Function to clear local storage
function clearLocalStorage() {
  localStorage.clear();
  alert("Local storage has been cleared.");
}

// Attach event listener to the button
document.getElementById("clearStorage").addEventListener("click", clearLocalStorage);
