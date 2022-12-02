"use strict";

import WEATHER_API_KEY from "../JS/app.js"

let weatherApi =
{
    /* fetching the data from the weather api */
    fetchWeather: function (coord) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + coord +
            "&units=metric&appid=" + WEATHER_API_KEY)
            .then((res) => res.json())
            .then((weatherdata) => this.displayWeather(weatherdata));
    },
    /* displaying the weather data */
    displayWeather: function (weatherdata) {
        const { name } = weatherdata;
        const { description } = weatherdata.weather[0];
        const { temp, humidity } = weatherdata.main;
        const { speed } = weatherdata.wind;

        $("#place").text("Weather in: " + name);
        $("#temp").text(Math.floor(temp) + " °C");
        $("#humid").text(humidity);
        $("#cloud").text(description);
        $("#spped").text(speed + " km/h");
        $(".weather-readings").removeClass("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-input").value);
    }
};

/* search upon clicking search or hitting enter */
$(".searchy").on("click", function () { weatherApi.search(); });
$(".search-input").on("keyup", function (evt) { if (evt.key == "Enter") { weatherApi.search(); } });

weatherApi.fetchWeather("Cape Town");
