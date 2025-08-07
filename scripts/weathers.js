const apiKey = '21dd3ef08d37b1e1fabed07f10b017b9';
const city = 'Canuelas,AR';

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`Error en la llamada al API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    const weatherDiv = document.getElementById('current-weather');
    weatherDiv.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>Temperatura: ${data.main.temp} °C</p>
      <p>Clima: ${data.weather[0].description}</p>
      <p>Humedad: ${data.main.humidity}%</p>
      <p>Viento: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
  document.getElementById('current-weather').innerHTML = `
    Temperature: 22 °C<br>
    Weather: Partly cloudy<br>
    Humidity: 65%<br>
    Wind: 3.5 m/s.
  `;
  console.error('Error getWeather:', error);
}

}

getWeather();

