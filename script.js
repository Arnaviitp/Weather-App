async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!location) {
    resultDiv.innerHTML = `<p>Please enter a location.</p>`;
    return;
  }

  const apiKey = "f1a0aa2e08cd47d3a6862520252007";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    resultDiv.innerHTML = `<p>Loading...</p>`;
    resultDiv.classList.remove("show");
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

    resultDiv.innerHTML = `
      <p><strong>${data.location.name}, ${data.location.country}</strong></p>
      <p class="temp">${data.current.temp_c}°C</p>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="Weather icon">
    `;

    setTimeout(() => resultDiv.classList.add("show"), 50); // smooth fade-in
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
