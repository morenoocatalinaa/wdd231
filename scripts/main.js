console.log("JS funcionando");
async function getWeatherCanuelas() {
  const apiKey = '21dd3ef08d37b1e1fabed07f10b017b9';
  const cityId = 3435713;

  const urlCurrent = https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric&lang=es;
  const urlForecast = https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&units=metric&lang=es;

  try {
    const [resCurrent, resForecast] = await Promise.all([
      fetch(urlCurrent),
      fetch(urlForecast),
    ]);

    if (!resCurrent.ok || !resForecast.ok) {
      throw new Error('Error al cargar datos del clima');
    }

    const currentData = await resCurrent.json();
    const forecastData = await resForecast.json();

    const currDesc = currentData.weather[0].description;
    const currTemp = Math.round(currentData.main.temp);
    document.getElementById('current-weather').textContent = 
      Cañuelas: Ahora ${currDesc}, ${currTemp}°C;

    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '<h3>Pronóstico 5 días</h3>';

    const dailyForecasts = [];
    const usedDates = new Set();

    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      const hour = date.getHours();

      if (!usedDates.has(day) && hour >= 11 && hour <= 14) {
        dailyForecasts.push(item);
        usedDates.add(day);
      }
    });

    dailyForecasts.forEach(item => {
      const date = new Date(item.dt * 1000);
      const options = { weekday: 'short', day: 'numeric', month: 'short' };
      const dayStr = date.toLocaleDateString('es-AR', options);

      const desc = item.weather[0].description;
      const temp = Math.round(item.main.temp);

      const div = document.createElement('div');
      div.textContent = ${dayStr}: ${desc}, ${temp}°C;
      forecastContainer.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    document.getElementById('current-weather').textContent = 'No se pudo cargar el clima.';
    document.getElementById('forecast').textContent = '';
  }
}