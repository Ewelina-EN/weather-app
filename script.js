let inputval = document.getElementById("cityinput")
let loc = document.getElementById("city");
let description = document.getElementById("description");
let temp = document.getElementById("temp");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");
let button = document.getElementById("add");
let wthIcon = document.getElementById("wth_icon");
// document.getElementById("weather").innerHTML = loader;
const weather = document.getElementById("weather");
const errorBox = document.getElementById("error");
const locationBtn = document.getElementById("button_loc");

const APIurl = "https://api.openweathermap.org/data/2.5/weather?appid=0c4f2607e0804404144f0b1b16a29ef8&mode=json&lang=en&units=metric&q=";

locationBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (data) {
             console.log(data) }, function (err) { alert(err) });
    } else {
        alert("Your browser not support geolocation api");
    }
})

button.addEventListener('click', function (event) {
    event.preventDefault();
    errorBox.classList.add("hidden");
    weather.classList.add("hidden");
    fetch(APIurl + inputval.value)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText, { cause: response });
            }
            return response.json();
        })
        .then((data) => {
            weather.classList.remove("hidden");
            console.log("response", data);
            loc.innerHTML = data.name + "," + " " + data.sys.country;
            temp.innerHTML = Math.round(data.main.temp) + " " + "°C";
            description.innerHTML = data.weather[0].description;
            pressure.innerHTML = `<img src="/css/images/thermometer.png" width="30" heigth="30">` + " " + data.main.pressure + " " + "hPa";
            wind.innerHTML = `<img src="/css/images/wind.png" width="30" heigth="30">` + data.wind.speed + " " + "km/h";

            const icon = data.weather[0].icon;
            wthIcon.innerHTML = `<img src="/css/icons/${icon}.png" >`;
        })
        .catch(error => {
            errorBox.classList.remove("hidden");
            switch (error.cause.status) {
                case 404:
                case 500:
                    errorBox.innerHTML = `<p>No results found</p>`
                    errorBox.innerHTML = `<img src="/css/images/findicon.png" width="50" heigth="50"> <p>No results found </p>`;
                    break;
                default:
                    errorBox.innerHTML = `<p>Please enter a city</p>`
                    alert("Unknown error. Try again later.")
            }
        });
});

