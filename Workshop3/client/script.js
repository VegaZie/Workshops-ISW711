function getCourses() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedGet);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", "http://localhost:3001/api/courses");
  ajaxRequest.send();
}

function getCoursesFilter() {
  const sortSelector = document.querySelector("#sortDirection");
  const sortDirection = sortSelector.value;

  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedGet);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open(
    "GET",
    `http://localhost:3001/api/courses?sort=${sortDirection}`
  );
  ajaxRequest.send();
}

function completedGet(event) {
  const response = JSON.parse(event.target.responseText);
  const tableBody = document.querySelector("#coursesTable tbody");

  // Limpiar la tabla antes de actualizarla
  tableBody.innerHTML = "";

  // Recorrer los cursos y agregar filas a la tabla
  response.forEach((course) => {
    const row = document.createElement("tr");
    const idTr = course._id;
    row.id = idTr;

    // Crear celdas para cada propiedad del curso
    const nameCell = document.createElement("td");
    const nameCourse = document.createElement("label");
    nameCourse.textContent = course.name;
    nameCell.appendChild(nameCourse);
    row.appendChild(nameCell);

    const creditsCell = document.createElement("td");
    const creditCourse = document.createElement("label");
    creditCourse.textContent = course.credits;
    creditsCell.appendChild(creditCourse);
    row.appendChild(creditsCell);

    const teacherCell = document.createElement("td");
    const teacherCourse = document.createElement("label");
    if (course.teacher === undefined || course.teacher === null) {
      teacherCourse.textContent = "Sin asignar";
    } else {
      teacherCourse.textContent =
        course.teacher.first_name + " " + course.teacher.last_name;
    }
    teacherCell.appendChild(teacherCourse);
    row.appendChild(teacherCell);

    // Crear celda de acciones con botones de editar y eliminar
    const actionsCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => {
      console.log(course);
      editCourse(course);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      deleteCourse(course._id);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

function deleteCourse(courseId) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedDelete);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open(
    "DELETE",
    `http://localhost:3001/api/courses?id=${courseId}`
  );
  ajaxRequest.send();
}

function completedDelete(event) {
  // Lógica para manejar la respuesta del servidor después de eliminar el curso
  console.log("Curso eliminado:", event.target.responseText);
  // Volver a obtener la lista de cursos después de eliminar uno
  getCourses();
}

function error(event) {
  console.error("Error en la solicitud AJAX:", event.target.status);
}

function postCourses() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedPost);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3001/api/courses");

  // Obtener los valores de los campos de entrada
  const name = document.querySelector("#nameInput").value;
  const credits = document.querySelector("#creditsInput").value;

  // Crear el objeto del curso a enviar
  const course = {
    name: name,
    credits: credits,
  };

  // Convertir el objeto a JSON y establecer la cabecera de la solicitud
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send(JSON.stringify(course));
}

function completedPost(event) {
  // Lógica para manejar la respuesta del servidor después de crear el curso
  console.log("Curso creado:", event.target.responseText);
  getCourses();
}

// Asignar el evento click al botón de crear
document.querySelector("#createButton").addEventListener("click", postCourses);

function updateCourse(courseId, newName, newCredits, newTeacher) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedUpdate);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("PATCH", `http://localhost:3001/api/courses?id=${courseId}`);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");

  const data = {
    name: newName,
    credits: newCredits,
    teacher: newTeacher,
  };

  ajaxRequest.send(JSON.stringify(data));
}

function completedUpdate(event) {
  // Lógica para manejar la respuesta del servidor después de actualizar el curso
  console.log("Curso actualizado:", event.target.responseText);
  // Puedes realizar otras acciones aquí, como mostrar un mensaje de éxito o actualizar la tabla de cursos
  // Volver a obtener la lista de cursos después de actualizar uno
  getCourses();
}

function editCourse(course) {
  // Obtener los valores actuales del curso
  const currentName = course.name;
  const currentCredits = course.credits;
  let currentTeacher;
  if (course.teacher === undefined) {
    currentTeacher = "Sin profesor";
  } else {
    currentTeacher = course.teacher._id;
  }

  // Crear un formulario para editar el curso
  const form = document.createElement("form");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = currentName;
  form.appendChild(nameInput);

  const creditsInput = document.createElement("input");
  creditsInput.type = "number";
  creditsInput.value = currentCredits;
  form.appendChild(creditsInput);

  const teacherInput = document.createElement("input");
  teacherInput.type = "text";
  teacherInput.value = currentTeacher;
  form.appendChild(teacherInput);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Guardar";
  form.appendChild(saveButton);

  // Agregar evento de submit al formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCourse(
      course._id,
      nameInput.value,
      creditsInput.value,
      teacherInput.value
    );
  });

  // Reemplazar la fila actual con el formulario de edición
  const row = document.querySelector(`tr[id="${course._id}"]`);
  row.innerHTML = "";
  const cell = document.createElement("td");
  cell.colSpan = 4;
  cell.appendChild(form);
  row.appendChild(cell);
}

//Función para mostrar datos de los profesores para su asignación

function getTeachers() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", "http://localhost:3001/api/teachers");
  ajaxRequest.send();
}

function completed() {
  if (this.status === 200) {
    const teachers = JSON.parse(this.responseText);
    const tableBody = document.querySelector("#teachersTable tbody");

    // Limpiar la tabla antes de agregar los datos
    tableBody.innerHTML = "";

    // Agregar cada profesor como una fila en la tabla
    teachers.forEach(function (teacher) {
      const row = document.createElement("tr");

      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = teacher.first_name;
      row.appendChild(firstNameCell);

      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = teacher.last_name;
      row.appendChild(lastNameCell);

      const cedulaCell = document.createElement("td");
      cedulaCell.textContent = teacher.cedula;
      row.appendChild(cedulaCell);

      const ageCell = document.createElement("td");
      ageCell.textContent = teacher._id;
      row.appendChild(ageCell);

      tableBody.appendChild(row);
    });
  } else {
    console.log("Error al obtener los profesores");
  }
}

getTeachers();
getCourses();
