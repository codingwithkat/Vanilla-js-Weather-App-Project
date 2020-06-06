let apiKey = "09fda6f90b159be94949753225d9045d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=${apiKey}&units=imperial`;
console.log(apiUrl);

function showTodaysStats(response) {
    console.log(response.data.weather[0].description);
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
}

axios.get(apiUrl).then(showTodaysStats); //keep outside of function 