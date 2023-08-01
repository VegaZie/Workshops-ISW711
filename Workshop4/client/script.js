document.addEventListener("DOMContentLoaded", () => {
    const teacherContainer = document.querySelector(".teacher-container");
    const courseContainer = document.querySelector(".course-container");
  
    // Fetch teachers data
    fetch("http://localhost:3001/graphql", {
      method: "POST", // Cambiamos el método de GET a POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query {
              teachers {
                  _id
                  first_name
                  last_name
                  cedula
                  age
                }
            }
          `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const teachers = data.data.teachers;
        teachers.forEach((teacher) => {
          const card = createCard(teacher);
          teacherContainer.appendChild(card);
        });
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  
    // Fetch courses data
    fetch("http://localhost:3001/graphql", {
      method: "POST", // Cambiamos el método de GET a POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query {
              courses {
                _id
                name
                credits
              }
            }
          `,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const courses = data.data.courses;
        courses.forEach((course) => {
          const card = createCard(course);
          courseContainer.appendChild(card);
        });
      })
      .catch((error) => console.error("Error fetching courses:", error));
  
    function createCard(data) {
      const card = document.createElement("div");
      card.classList.add("card");
  
      if (data.first_name) {
        card.innerHTML = `
            <h3>${data.first_name} ${data.last_name}</h3>
            <p>Cedula: ${data.cedula}</p>
            <p>Age: ${data.age}</p>
          `;
      } else {
        card.innerHTML = `
            <h3>${data.name}</h3>
            <p>Credits: ${data.credits}</p>
          `;
      }
  
      return card;
    }
  });
  