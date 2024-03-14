const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const course = currentUser ? currentUser.course : null;
const name =currentUser ? currentUser.firstName: null;
document.getElementById("teachersTitle").innerText = "Teacher "+ name + "'s Page - " + course;
document.getElementById("gradeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Get form data
    const studentNumber = document.getElementById("studentNumber").value;
    const grade = document.getElementById("grade").value;
  
    // Access the course property
   
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
            switch (course) {
                case "English":
                    user.english = grade;
                    break;
                case "Mathematics":
                    user.mathematics = grade;
                    break;
                case "Physics":
                    user.physics = grade;
                    break;
                default:
                    break;
            }
            break; // Stop searching once the user is found
        }
    }

    // Update the users array in local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Clear form fields after submission
    document.getElementById("studentNumber").value = "";
    document.getElementById("grade").value = "";
  
    alert("Grade submitted successfully.");
    
  });
