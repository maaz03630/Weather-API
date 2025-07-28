const apiKey = "654902c5d3d34ec48b2191951252707";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultBox.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="https:${icon}" alt="${condition}">
      <p><strong>Temperature:</strong> ${tempC}°C</p>
      <p><strong>Condition:</strong> ${condition}</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
