document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});

document.getElementById("greetButton").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value;
  try {
    const response = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
    const message = await response.text();
    document.getElementById("greetMessage").textContent = message;
  } catch (err) {
    document.getElementById("greetMessage").textContent = "Error al conectar con el servidor";
  }
});

document.getElementById("addStudentForm").addEventListener("submit", async (event) => {
  event.preventDefault(); 

  const name = document.getElementById("studentName").value;

  try {
  
    const response = await fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const student = await response.json();
      alert(`Estudiante agregado: ${student.name} (ID: ${student.id})`);

      document.getElementById("studentName").value = "";

      loadStudents(); 
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("Error al agregar el estudiante.");
  }
});

async function loadStudents() {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = ""; 

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
}
