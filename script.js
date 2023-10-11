const apiKey = "5327e387f438b4f1f6d673e5839d9df3"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const dateElement = document.querySelector(".date");

function displayTodayDate() {
  const options = {weekday: "long", month: "long", day: "numeric" };
  const today = new Date();
  dateElement.innerHTML = today.toLocaleDateString(undefined, options);
  console.log(today);
}

async function checkWeather(city) {

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404 ) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  else {
    document.querySelector(".weather").style.display = "block";
  }

  var data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".weathertype").innerHTML = data.weather[0].main;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "img/mist.png";
  }
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
  displayTodayDate();
});


