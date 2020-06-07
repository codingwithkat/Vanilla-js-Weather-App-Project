
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

let apiKey = "09fda6f90b159be94949753225d9045d";
let city = "Atlanta";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTodaysStats); //keep outside of function 


