function displayVisitMessage() {
  const messageContainer = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const now = new Date();
    const difference = now - lastVisitDate;
    const daysBetween = Math.floor(difference / (1000 * 60 * 60 * 24));

    messageContainer.textContent = daysBetween === 0
      ? "Bienvenido nuevamente. ¡Nos alegra verte otra vez hoy!"
      : `Tu última visita fue hace ${daysBetween} día(s). ¡Bienvenido de nuevo!`;
  } else {
    messageContainer.textContent = "¡Bienvenido! Esta es tu primera visita.";
  }

  localStorage.setItem("lastVisit", new Date());
}

document.addEventListener("DOMContentLoaded", () => {
  displayVisitMessage();

  fetch("data/discover.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      console.log("JSON data loaded:", data);
      const grid = document.getElementById("discover-grid");
      const places = data.places;

      places.forEach((place) => {
        const card = document.createElement("section");
        card.classList.add("card");
        card.innerHTML = `
          <h2>${place.title}</h2>
          <img src="images/${place.image}" alt="${place.title}">
          <p>${place.description}</p>
        `;
        grid.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
