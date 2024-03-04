var nameInput = document.getElementById("name");
var exam1Input = document.getElementById("exam1");
var exam2Input = document.getElementById("exam2");
var exam3Input = document.getElementById("exam3");

nameInput.addEventListener("input", validateName);
exam1Input.addEventListener("input", validateGrade);
exam2Input.addEventListener("input", validateGrade);
exam3Input.addEventListener("input", validateGrade);



function calculateAverage() {
  //conver it from string into integer
  var exam1 = parseInt(document.getElementById("exam1").value);
  var exam2 = parseInt(document.getElementById("exam2").value);
  var exam3 = parseInt(document.getElementById("exam3").value);

  var name = document.getElementById("name").value;

 
  if (checkGrade(exam3) && checkGrade(exam1) && checkGrade(exam2)&& checkName(name)) {
    
    var average = (exam1 + exam2 + exam3) / 3;
    document.getElementById("averageOutput").innerText = "Average Grade: " + average.toFixed(2);
  } else {
    document.getElementById("averageOutput").innerText = "Please enter valid grades for all exams.";
  }
}

//Name Validation
function validateName(event) {
  var name = event.target.value;
  var isValid = checkName(name);
  var validationMessage = isValid ? "" : "Invalid name";
  nameInput.setCustomValidity(validationMessage);
}

//Grade of exam-1 Validation
function validateGrade(event) {
  var exam1Value = event.target.value;
  var isValid = checkGrade(exam1Value);
  var validationMessage = isValid ? "" : "Invalid grade";
  event.target.setCustomValidity(validationMessage);
}

//Grade of exam-2 Validation
function validateGrade(event) {
  var exam2Value = event.target.value;
  var isValid = checkGrade(exam2Value);
  var validationMessage = isValid ? "" : "Invalid grade";
  event.target.setCustomValidity(validationMessage);
}

//Grade of exam-3 Validation
function validateGrade(event) {
  var exam3Value = event.target.value;
  var isValid = checkGrade(exam3Value);
  var validationMessage = isValid ? "" : "Invalid grade";
  event.target.setCustomValidity(validationMessage);
}

function allStorage() {
  var studentInfo = localStorage.getItem("studentData");
  var outputElement = document.getElementById("output");

  if (studentInfo) {
    try {
      var parsedData = JSON.parse(studentInfo);

      // If the parsed data is an array
      if (Array.isArray(parsedData)) {
        var html = "";

        // Get the data
        parsedData.forEach(function (student) {
          var name = student.name;
          var exam1 = student.exam1;
          var exam2 = student.exam2;
          var exam3 = student.exam3;

          // Displaying the stored data
          html +=
            "<p>Name: " +
            name +
            "   Exam 1: " +
            exam1 +
            "   Exam 2: " +
            exam2 +
            "   Exam 3: " +
            exam3 +
            "</p>";
        });

        outputElement.innerHTML = html;
      } else {
        outputElement.innerHTML = "Invalid format.";
      }
    } catch (error) {
      outputElement.innerHTML = "Error! - parsing data from local storage.";
      console.error(error);
    }
  } else {
    outputElement.innerHTML = "There is no data in local storage.";
  }

  // Function to clear local storage
function clearLocalStorage() {
  localStorage.clear();
  alert("Local storage has been cleared.");
}

// Attach event listener to the button
document.getElementById("clearStorage").addEventListener("click", clearLocalStorage);
}


window.allStorage = showLocalStorage;
