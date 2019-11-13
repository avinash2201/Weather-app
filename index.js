//getting
const temperature = document.querySelector(".temperature");
const notification = document.querySelector(".notification ");
const iconId = document.querySelector(".weather-icon");
const description = document.querySelector(".description");
const loc = document.querySelector(".location p");
//
const weather = {};
const KELVIN = 273;
const key = "6f1db5d76b7a1b64b719ac2af7e950bb";
//geolocation is there or // NOTE:
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showerror);
} else {
  notification.style.display = "block";
  notification.innerHTML = "<p>Browser Doesn't support</p>";
}

//getting setPosition
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function showerror(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);
  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;

    })
    .then(function() {
      displayWeather();
    });
}
//
function displayWeather() {
  description.innerHTML = weather.description;
  loc.innerHTML = `${weather.city},${weather.country}`;
  temperature.innerHTML = `${weather.temperature}<span>°C</span>`
  iconId.innerHTML = `<img src ="${weather.iconId}.png">`;
}
