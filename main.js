let timeout;
function debounceSearch() {
    clearTimeout(timeout);
    timeout = setTimeout(getWeather, 500);
}

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return;

    const apiKey = "6551654516784e4fds";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            updateUI(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateUI(data) {
    const weatherCard = document.getElementById("weather-card");
    const icon = document.getElementById("icon");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const weatherDesc = document.getElementById("weather-desc");
    const feelsLike = document.getElementById("feels-like");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const pressure = document.getElementById("pressure");
    const visibility = document.getElementById("visibility");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    const { name, main, weather, wind, sys, visibility: vis } = data;

    cityName.textContent = name;
    temperature.textContent = `${main.temp}°C`;
    weatherDesc.textContent = weather[0].description;
    feelsLike.textContent = `Feels Like: ${main.feels_like}°C`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;
    pressure.textContent = `Pressure: ${main.pressure} hPa`;
    visibility.textContent = `Visibility: ${(vis / 1000).toFixed(1)} km`;
    
    // Format sunrise and sunset times
    const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();
    sunrise.textContent = `Sunrise: ${sunriseTime}`;
    sunset.textContent = `Sunset: ${sunsetTime}`;

    const weatherCondition = weather[0].main.toLowerCase();
    setBackground(weatherCondition);
    setWeatherIcon(weatherCondition, icon);

    weatherCard.style.display = "block";
}

function setBackground(condition) {
    const app = document.getElementById("app");
    if (condition.includes("cloud")) {
        app.style.background = "linear-gradient(to bottom, #4c669f, #3b5998)";
    } else if (condition.includes("rain")) {
        app.style.background = "linear-gradient(to bottom, #000046, #1cb5e0)";
    } else if (condition.includes("clear")) {
        app.style.background = "linear-gradient(to bottom, #ff7e5f, #feb47b)";
    } else if (condition.includes("snow")) {
        app.style.background = "linear-gradient(to bottom, #00c6ff, #0072ff)";
    } else {
        app.style.background = "linear-gradient(to bottom, #ffafbd, #ffc3a0)";
    }
}

function setWeatherIcon(condition, iconElement) {
    const icons = {
        clear: "☀️",
        rain: "🌧️",
        cloud: "☁️",
        snow: "❄️",
        thunderstorm: "⚡",
    };

    for (const [key, icon] of Object.entries(icons)) {
        if (condition.includes(key)) {
            iconElement.textContent = icon;
            return;
        }
    }

    iconElement.textContent = "🌍"; // Default icon
}
