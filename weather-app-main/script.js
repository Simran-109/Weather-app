const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "71cfff3f75fdb58e115255122228b695";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // 

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        weather_body.style.display = "block";
        location_not_found.style.display = "none";

        temperature.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind_speed.innerHTML = `${Math.round(data.wind.speed * 3.6)} Km/H`;

        const condition = data.weather[0].main;

        if (condition === "Clouds") weather_img.src = "assets/cloudy cloud.png";
        else if (condition === "Clear") weather_img.src = "assets/sun cloud ai.webp";
        else if (condition === "Rain") weather_img.src = "assets/rain cloud.gif";
        else if (condition === "Snow") weather_img.src = "assets/snow.webp";
        else weather_img.src = "assets/cloudy cloud.png";

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    if (inputBox.value.trim() !== "") {
        checkWeather(inputBox.value);
    }
});
