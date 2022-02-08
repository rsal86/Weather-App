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

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class = "row">`;
	let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`<div class="col-2">
						<div class="weather-forecast-date">${day}</div>
						<img
							src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
							alt=""
							width="42"
						/>
						<div class="weather-forecast-temperatures">
							<span class="weather-forecast-temperature-max">18° </span>
							<span class="weather-forecast-temperature-min">12°</sßpan>
						</div>
					</div>`;
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "687530026c0591404564d5611a187195";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
	axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
	let temperatureElement = document.querySelector("#temp");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dateElement = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");

	celsiusTemperature = response.data.main.temp;

	temperatureElement.innerHTML = Math.round(celsiusTemperature);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);

	getForecast(response.data.coord);
}

function search(city) {
	let apiKey = "687530026c0591404564d5611a187195";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#search-city-input");
	search(cityInputElement.value);
}

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	//let units = "imperial";
	let apiKey = "687530026c0591404564d5611a187195";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temp");

	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
