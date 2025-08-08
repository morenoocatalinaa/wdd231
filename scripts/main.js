document.addEventListener("DOMContentLoaded", () => {
  const lastModified = document.lastModified;
  document.getElementById("modified").textContent = lastModified;

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("main-nav");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  const apiKey = '21dd3ef08d37b1e1fabed07f10b017b9';
  const city = 'Canuelas,AR';

  async function getWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      const weatherDiv = document.getElementById('current-weather');
      weatherDiv.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
      `;
    } catch (error) {
      document.getElementById('current-weather').innerHTML = `
        Temperature: 22 °C<br>
        Weather: Partly cloudy<br>
        Humidity: 65%<br>
        Wind: 3.5 m/s
      `;
    }
  }

  async function getForecast() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=en&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      const forecastDiv = document.getElementById('forecast');
      forecastDiv.innerHTML = '';

      const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      dailyData.forEach(day => {
        const date = new Date(day.dt_txt);
        forecastDiv.innerHTML += `
          <div>
            <strong>${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</strong><br>
            Temp: ${day.main.temp} °C<br>
            ${day.weather[0].description}
          </div>
        `;
      });
    } catch (error) {
      document.getElementById('forecast').innerHTML = `
        Unable to load forecast.
      `;
    }
  }

  getWeather();
  getForecast();
});
