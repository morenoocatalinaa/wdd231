const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true, category: "WDD" },
  { code: "WDD231", name: "Frontend Development II", credits: 3, completed: false, category: "WDD" },
  { code: "CSE110", name: "Intro to Programming", credits: 2, completed: true, category: "CSE" },
  { code: "CSE111", name: "Programming with Functions", credits: 3, completed: false, category: "CSE" }
];

const container = document.getElementById("course-cards");
const totalCredits = document.getElementById("total-credits");

function displayCourses(list) {
  container.innerHTML = "";
  let total = 0;

  list.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "course completed" : "course";
    card.innerHTML = `<h3>${course.code}: ${course.name}</h3><p>Credits: ${course.credits}</p>`;
    container.appendChild(card);
    total += course.credits;
  });

  totalCredits.textContent = total;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.category === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.category === "CSE")));

displayCourses(courses);
