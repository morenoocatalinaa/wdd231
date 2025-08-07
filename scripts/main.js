document.addEventListener("DOMContentLoaded", () => {
  const lastModified = document.lastModified;
  document.getElementById("modified").textContent = lastModified;
});

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const apiKey = "TU_API_KEY";
const city = "Cañuelas,AR";
const units = "metric";
const apiCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}&lang=es`;
const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}&lang=es`;

const currentWeatherDiv = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");

async function displayCurrentWeather() {
  try {
    const response = await fetch(apiCurrent);
    if (!response.ok) throw new Error();
    const data = await response.json();

    currentWeatherDiv.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>${data.weather[0].description}</p>
      <p>🌡️ ${data.main.temp.toFixed(1)}°C</p>
      <p>💨 ${data.wind.speed} m/s</p>
    `;
  } catch {
    currentWeatherDiv.textContent = "No se pudo cargar el clima actual.";
  }
}

async function displayForecast() {
  try {
    const response = await fetch(apiForecast);
    if (!response.ok) throw new Error();
    const data = await response.json();

    const middayForecasts = data.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

    forecastDiv.innerHTML = middayForecasts.map(f => `
      <div class="forecast-item">
        <p><strong>${new Date(f.dt_txt).toLocaleDateString("es-AR", { weekday: 'long', day: 'numeric', month: 'short' })}</strong></p>
        <p>${f.weather[0].description}</p>
        <p>🌡️ ${f.main.temp.toFixed(1)}°C</p>
      </div>
    `).join("");
  } catch {
    forecastDiv.textContent = "No se pudo cargar el pronóstico.";
  }
}

displayCurrentWeather();
displayForecast();
