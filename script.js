let inputval = document.getElementById("cityinput");
let loc = document.getElementById("city");
let description = document.getElementById("description");
let temp = document.getElementById("temp");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");
let button = document.getElementById("add");
let wthIcon = document.getElementById("wth_icon");
const weather = document.getElementById("weather");
const errorBox = document.getElementById("error");
const locationBtn = document.getElementById("button_loc");
const infoTxt = document.getElementById("info_txt");
const API_settings =
  "appid=0c4f2607e0804404144f0b1b16a29ef8&mode=json&lang=en&units=metric&";
const APIUrl = `https://api.openweathermap.org/data/2.5/weather?${API_settings}`;

locationBtn.addEventListener("click", function (event) {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  const url = `${APIUrl}&lat=${latitude}&lon=${longitude}`;
  fetchData(url);
}

function onError(error) {
  console.log("locEr", error);
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData(url) {
  fetch(url)
    .then((response) => responseApi(response))
    .then((data) => weatherDetails(data))
    .catch((error) => catchError(error));
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  errorBox.classList.add("hidden");
  weather.classList.add("hidden");
  fetchData(`${APIUrl}&q=${inputval.value}`);
});

function responseApi(response) {
  if (!response.ok) {
    throw new Error(response.statusText, { cause: response });
  }
  return response.json();
}

function catchError(error) {
  errorBox.classList.remove("hidden");
  switch (error.cause.status) {
    case 404:
    case 500:
      errorBox.innerHTML = `<p>No results found</p>`;
      errorBox.innerHTML = `<img src="/css/images/findicon.png" width="50" heigth="50"> <p>No results found </p>`;
      break;
    default:
      errorBox.innerHTML = `<p>Please enter a city</p>`;
      alert("Unknown error. Try again later.");
  }
}

function weatherDetails(data) {
  weather.classList.remove("hidden");
  loc.innerHTML = data.name + "," + " " + data.sys.country;
  temp.innerHTML = Math.round(data.main.temp) + " " + "°C";
  description.innerHTML = data.weather[0].description;
  pressure.innerHTML =
    `<img src="/css/images/thermometer.png" width="30" heigth="30">` +
    " " +
    data.main.pressure +
    " " +
    "hPa";
  wind.innerHTML =
    `<img src="/css/images/wind.png" width="30" heigth="30">` +
    data.wind.speed +
    " " +
    "km/h";
  const icon = data.weather[0].icon;
  wthIcon.innerHTML = `<img src="/css/icons/${icon}.png" >`;
}
