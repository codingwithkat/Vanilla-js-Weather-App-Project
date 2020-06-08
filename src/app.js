
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function showTodaysStats(response) {
    document.querySelector("#selected-city").innerHTML =
        response.data.name;
    document.querySelector("#temperature").innerHTML =
        Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML =
        Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML =
        Math.round(response.data.wind.speed);
    document.querySelector("#day-descrip").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#date").innerHTML =
        formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
    celsiusTemperature = Math.round(response.data.main.temp);
}

function showForecast(response) {
    let forecastElement = document.querySelector("#forecast-data");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        let forecast = response.data.list[index];
        forecastElement.innerHTML +=
            `<div class="col" id="hourly">
        <h3>${formatHours(forecast.dt * 1000)}</h3>
    <img
        src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
            }@2x.png"
      />
        <div class="weather-forecast-temp">
    <strong>
    ${Math.round(forecast.main.temp_max)}° 
    </strong >
    ${ Math.round(forecast.main.temp_min)}°
    </div>
    </div> 
    `;
    }
}

function search(city) {
    let apiKey = "09fda6f90b159be94949753225d9045d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTodaysStats);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function submitButton(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function showFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");


    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Princeton");