function formatDate(timesstamp) {
	let date = new Date(timesstamp);
	//let currentDate = document.querySelector("#date");
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

	let day = days[date.getDate()];
	return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
	let currentTemp = document.querySelector("#temp");
	let currentCity = document.querySelector("#city");
	let currentDescription = document.querySelector("#description");
	let currentHumidity = document.querySelector("#humidity");
	let currentWindSpeed = document.querySelector("#wind");
	let iconElement = document.querySelector("#icon");
	let currentTempMax = document.querySelector("#current-high");
	let currentTempMin = document.querySelector("#current-low");

	fahrenheitTemperature = response.data.main.temp;

	currentTemp.innerHTML = Math.round(response.data.main.temp);
	currentCity.innerHTML = response.data.name;
	currentDescription.innerHTML = response.data.weather[0].description;
	currentHumidity.innerHTML = Math.round(response.data.main.humidity);
	currentWindSpeed = Math.round(response.data.wind.speed);
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	currentTempMax.innerHTML = Math.round(response.data.main.temp_max);
	currentTempMin.innerHTML = Math.round(response.data.main.temp_min);
}

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "687530026c0591404564d5611a187195";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(showPosition);
}

function search(event) {
	event.preventDefault();

	let currentCity = document.querySelector("#city");
	let searchInput = document.querySelector("#search-city-input");
	currentCity.innerHTML = `${searchInput.value}`;

	let apiKey = "687530026c0591404564d5611a187195";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;

	axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#search-city-input");
	search(cityInputElement.value);
}

function convertCelsius(event) {
	event.preventDefault();
	let tempElement = document.querySelector("#temperature");
	let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
	conso(celsiusTemperature);
	tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

search("New York");
