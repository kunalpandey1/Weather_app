let weather = {
  apiKey: "f9b673052186e1e8e2e57fc5a2180b1d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this
          .apiKey /*We are taking apikey inside our function fetchweather so give it this.apikey 
          to refer to the apikey above */
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found For");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const { sunrise } = data.sys;
    const { sunset } = data.sys;
    const { lon } = data.coord;
    const { lat } = data.coord;
    const formattedSunrise = new Date(sunrise * 1000).toLocaleTimeString();
    const formattedSunset = new Date(sunset * 1000).toLocaleTimeString();
    //console.log(name,icon,description,temp,humidity,speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.ceil(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading"); // as soon as the weather loads remove that visibility:hidden style
    document.querySelector(".sunrise").innerText =
      "Sunrise: " + formattedSunrise;
    document.querySelector(".sunset").innerText = "Sunset: " + formattedSunset;
    document.querySelector(".FeelsLike").innerText =
      "Feels like: " + feels_like;

    document.querySelector(".lon").innerText = "Longitude: " + lon;
    document.querySelector(".lat").innerText = "Lattitude: " + lat;

    // document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value); // whatever search value generate by user on search bar
  },
};

document.querySelector("button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Bangalore");
