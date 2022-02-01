let now = new Date();
let currentDate = document.querySelector("#date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${month} ${date}, ${year}`;

function showTemperature(response) {
	console.log(response.data);
	let city = response.data.name;
	let temperature = Math.round(response.data.main.temp);
	let description = response.data.weather[0].description;
	let tempMax = Math.round(response.data.main.temp_max);
	let tempMin = Math.round(response.data.main.temp_min);
	let humidity = Math.round(response.data.main.humidity);
	let wind = Math.round(response.data.wind.speed);

	console.log(response.data.main.temp);

	let currentCity = document.querySelector("#city");
	currentCity.innerHTML = `${city}`;

	let currentTemp = document.querySelector("#temp");
	currentTemp.innerHTML = `${temperature}`;

	let currentDescription = document.querySelector("#description");
	currentDescription.innerHTML = `${description}`;

	let currentTempMax = document.querySelector("#current-high");
	currentTempMax.innerHTML = `High: ${tempMax}°F`;

	let currentTempMin = document.querySelector("#current-low");
	currentTempMin.innerHTML = `Low: ${tempMin}°F`;

	let currentWindSpeed = document.querySelector("#wind");
	currentWindSpeed.innerHTML = `Wind: ${wind}mph`;

	let currentHumidity = document.querySelector("#humidity");
	currentHumidity.innerHTML = `Humidity: ${humidity}%`;

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	//let units = "imperial";
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

function convertCelsius(event) {
	event.preventDefault();
	let celsiusTemperature = ((currentTemp - 32) * 5) / 9;
	let currentTemp = document.querySelector("#temp");
	currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
