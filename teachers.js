const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const name = currentUser ? currentUser.firstName : null;
const course = currentUser ? currentUser.course : null;
// Function to dynamically populate the select element with all student numbers
function populateStudentNumbers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const studentNumberSelect = document.getElementById("studentNumber");
    document.getElementById("teachersTitle").innerText = "Teacher "+ name + "'s Page - " + course;
    // Clear existing options
    studentNumberSelect.innerHTML = '<option value="">Select Student Number</option>';
  
    // Add options for each student
    users.forEach(student => {
      if (student.role === 'student') {
        const option = document.createElement("option");
        option.value = student.idCard;
        option.textContent = student.idCard;
        studentNumberSelect.appendChild(option);
      }
    });
  }
  
  populateStudentNumbers();
  
  document.getElementById("gradeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Get form data
    const studentNumber = document.getElementById("studentNumber").value;
    const grade = document.getElementById("grade").value;
  
    // Validate form data (You can add more validations as needed)
    if (!studentNumber || !grade) {
      alert("Please fill in all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users"));
  
    // Loop through users to find the user with the matching ID card
    for (const user of users) {
      if (user.idCard === studentNumber) {
        // Update the grade based on the course
        user[course.toLowerCase()] = grade;
        break; // Stop searching once the user is found
      }
    }
  
    // Update the users array in local storage
    localStorage.setItem("users", JSON.stringify(users));
  
    // Clear form fields after submission
    document.getElementById("studentNumber").value = "";
    document.getElementById("grade").value = "";
  
    alert("Grade submitted successfully.");
  
    // Repopulate the student numbers select element
    populateStudentNumbers();
  
  });
  