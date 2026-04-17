let subjects = [
  "Mathematics",
  "English Language",
  "Basic Science",
  "Basic Technology",
  "Social Studies",
  "Civic Education",
  "Computer Studies",
  "Cultural & Creative Arts",
  "Agricultural Science",
  "Physical & Health Education",
  "Business Studies",
  "Home Economics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Government",
  "Geography",
  "Literature in English",
  "Accounting",
  "Commerce",
  "Further Mathematics",
  "Yoruba",
  "Diction"
];

// LOAD SUBJECTS INTO TABLE
window.onload = function () {
  let table = document.getElementById("subjectTable");
  table.innerHTML = "";

  subjects.forEach(sub => {
    table.innerHTML += `
      <tr>
        <td>${sub}</td>
        <td><input type="number" class="ca" min="0" max="50"></td>
        <td><input type="number" class="exam" min="0" max="50"></td>
        <td class="total"></td>
        <td class="grade"></td>
      </tr>
    `;
  });
};

// GRADE SYSTEM
function getGrade(score) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
}

// COMPUTE RESULT
function compute() {

  let className = document.getElementById("className").value;
  let studentName = document.getElementById("studentName").value;
  let admissionNo = document.getElementById("admissionNo").value;

  let ca = document.getElementsByClassName("ca");
  let exam = document.getElementsByClassName("exam");
  let total = document.getElementsByClassName("total");
  let grade = document.getElementsByClassName("grade");

  let sum = 0;

  for (let i = 0; i < ca.length; i++) {
    let c = Number(ca[i].value) || 0;
    let e = Number(exam[i].value) || 0;

    let t = c + e;
    total[i].innerText = t;
    grade[i].innerText = getGrade(t);

    sum += t;
  }

  let avg = sum / ca.length;
document.getElementById("rName").innerText = studentName;
document.getElementById("rAdm").innerText = admissionNo;
document.getElementById("rClass").innerText = className;

// BUILD REPORT TABLE
let resultBody = document.querySelector("#resultTable tbody");
resultBody.innerHTML = "";

for (let i = 0; i < subjects.length; i++) {

  let c = Number(ca[i].value) || 0;
  let e = Number(exam[i].value) || 0;
  let t = c + e;

  resultBody.innerHTML += `
    <tr>
      <td>${subjects[i]}</td>
      <td>${t}</td>
      <td>${getGrade(t)}</td>
    </tr>
  `;
}
  // COMMENTS
  let comment = "";

  if (avg >= 70) comment = "Excellent performance. Keep it up.";
  else if (avg >= 50) comment = "Good effort, but improvement is needed.";
  else comment = "Poor performance, must work harder.";

  // DISPLAY OUTPUT
  document.getElementById("average").innerText =
    "Student: " + studentName +
    " | Class: " + className +
    " | Admission No: " + admissionNo +
    " | Average: " + avg.toFixed(2);

  document.getElementById("comment").innerText =
    "Comment: " + comment;
}function renderSubjects() {
  let table = document.getElementById("subjectTable");
  let removeSelect = document.getElementById("removeSubject");

  table.innerHTML = "";
  removeSelect.innerHTML = "";

  subjects.forEach(sub => {

    // table row
    table.innerHTML += `
      <tr>
        <td>${sub}</td>
        <td><input type="number" class="ca"></td>
        <td><input type="number" class="exam"></td>
        <td class="total"></td>
        <td class="grade"></td>
      </tr>
    `;

    // dropdown option
    removeSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
  });
}

// ADD SUBJECT
function addSubject() {
  let newSub = document.getElementById("newSubject").value;

  if (newSub === "") {
    alert("Enter a subject name");
    return;
  }

  subjects.push(newSub);
  document.getElementById("newSubject").value = "";

  renderSubjects();
}

// REMOVE SUBJECT
function removeSubject() {
  let sub = document.getElementById("removeSubject").value;

  subjects = subjects.filter(s => s !== sub);

  renderSubjects();
}function saveResult() {
  let studentName = document.getElementById("studentName").value;
  let admissionNo = document.getElementById("admissionNo").value;
  let className = document.getElementById("className").value;

  let ca = document.getElementsByClassName("ca");
  let exam = document.getElementsByClassName("exam");

  let data = [];

  for (let i = 0; i < subjects.length; i++) {
    let c = Number(ca[i].value) || 0;
    let e = Number(exam[i].value) || 0;

    data.push({
      subject: subjects[i],
      ca: c,
      exam: e,
      total: c + e,
      grade: getGrade(c + e)
    });
  }

  let record = {
    name: studentName,
    admissionNo: admissionNo,
    className: className,
    results: data
  };

  localStorage.setItem("intesidaResult", JSON.stringify(record));

  alert("Result Saved Successfully 👍");
}