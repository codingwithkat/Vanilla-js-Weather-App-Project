
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

function showTodaysStats(response) {
    document.querySelector("#selected-city").innerHTML =
        response.data.name;
    document.querySelector("#temperature").innerHTML =
        Math.round(response.data.main.temp);
    document.querySelector("#feels-like").innerHTML =
        Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML =
        Math.round(response.data.main.humidity);
    document.querySelector("#wind").innerHTML =
        Math.round(response.data.wind.speed);
    document.querySelector("#day-descrip").innerHTML =
        response.data.weather[0].description;
    document.querySelector("#date").innerHTML =
        formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "09fda6f90b159be94949753225d9045d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showTodaysStats);
}


function submitButton(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function showCelsiusTemp(event) {
    event.preventDefault();
    let celsiusTemp = (83 − 32) * 5 / 9;
    alert(celsiusTemp);
}

function showFahrenheitTemp(event) {
    event.preventDefault();
    alert("F clicked");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitButton);

//Celsius and Fahrenheit for temp on the left 
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//Celsius and Fahrenheit for feels like on the right(description)
let celsiusLinkTwo = document.querySelector("#celsius-link-two");
celsiusLinkTwo.addEventListener("click", showCelsiusTemp);

let fahrenheitLinkTwo = document.querySelector("#fahrenheit-link-two");
fahrenheitLinkTwo.addEventListener("click", showFahrenheitTemp);