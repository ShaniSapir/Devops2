document.addEventListener('DOMContentLoaded', function() {
    var gradesList = document.getElementById('gradesList');
    var subjects = ['Mathematics', 'Physics', 'English'];
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    // Loop through subjects to display grades or "No grade at the moment"
    subjects.forEach(function(subject) {
        var gradeKey = `${subject.toLowerCase()}_${currentUser.idCard}`;
        var grade = currentUser[subject.toLowerCase()];
        var gradeItem = document.createElement('div');
        gradeItem.classList.add('grade-item');
        gradeItem.innerHTML = "<strong>Subject:</strong> " + subject + ", <strong>Grade:</strong> " + (grade ? grade : "No grade at the moment");
        gradesList.appendChild(gradeItem);
    });
});

