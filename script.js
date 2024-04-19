// API key for OpenWeatherMap
const apiKey = "d693b065359d8dc36c66419a752786e5";

// Get references to DOM elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherVideo = document.querySelector("#weatherVideo");
const weatherConditionElement = document.querySelector(".weather-condition");

// Function to fetch and update weather data
async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(
        `API request failed with status code: ${response.status}`
      );
    }
    const data = await response.json();
    if (!data.main || !data.wind) {
      throw new Error("Invalid data received from API");
    }

    // Update the weather details in the UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    // Update the weather icon, video, and condition based on the current weather
    const weatherCondition = data.weather[0].main;
    weatherConditionElement.innerHTML = weatherCondition;

    switch (weatherCondition) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        weatherVideo.src = "videos/clouds.mp4";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        weatherVideo.src = "videos/clear.mp4";
        break;
      case "Thunderstorm":
        weatherIcon.src = "images/thunderstorm.png";
        weatherVideo.src = "videos/thunderstorm.mp4";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        weatherVideo.src = "videos/rain.mp4";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        weatherVideo.src = "videos/drizzle.mp4";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        weatherVideo.src = "videos/mist.mp4";
        break;
      case "Haze":
        weatherIcon.src = "images/haze.png";
        weatherVideo.src = "videos/haze.mp4";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        weatherVideo.src = "videos/snow.mp4";
        break;
      default:
        weatherIcon.src = "images/unknown.png";
        weatherVideo.src = "videos/unknown.mp4";
    }

    // Display the weather section
    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Error fetching or processing weather data:", error);
    alert("An error occurred while fetching weather data. Please try again.");
  }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
