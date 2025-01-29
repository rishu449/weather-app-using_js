const apiKey = "dff5bd1f0f7f8c6b080216aa3cc42f21";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        errorDiv.textContent = "Please enter a city name.";
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        errorDiv.style.display = "none";
        weatherDiv.style.display = "block";

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp - 273.15)}°C`;
        document.querySelector(".humid").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} Km/h`;

        // Update weather icon
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `${weatherCondition}.png`;
    } catch (error) {
        errorDiv.textContent = "Invalid City Name";
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => checkWeather(cityInput.value));
cityInput.addEventListener("input", () => errorDiv.style.display = "none");