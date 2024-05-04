"use strict";
class APICall {
    constructor(endpoint, params) {
        this.endpoint = endpoint;
        this.params = params;
        this.getCall();
    }
    getCall() {
        //add params to url
        let url = APICall.url + '/' + this.endpoint + '?';
        this.params.forEach((value, key) => {
            url += key + '=' + value + '&';
        });
        //remove last &
        url = url.substring(0, url.length - 1);
        //make get call
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
            console.log(data);
            if (this.endpoint === "current") {
                this.displayCurrentData(data);
            }
            else if (this.endpoint === "location-info") {
                this.displayLocationData(data);
            }
            else if (this.endpoint === "forecast-plot") {
                this.displayForecastPlot(data);
            }
        });
    }
    displayCurrentData(data) {
        const weatherDescription = document.getElementById("weatherDescription");
        if (weatherDescription) {
            weatherDescription.innerText = data.weather_descriptions[0];
        }
        const temperature = document.getElementById("temperature");
        if (temperature) {
            temperature.innerText = data.temperature + "°C";
        }
        const humidity = document.getElementById("humidity");
        if (humidity) {
            humidity.innerText = data.humidity + "%";
        }
        const windSpeed = document.getElementById("windSpeed");
        if (windSpeed) {
            windSpeed.innerText = data.wind_speed + " km/h";
        }
        const precipitation = document.getElementById("precipitation");
        if (precipitation) {
            precipitation.innerText = data.precip + " mm";
        }
        const pressure = document.getElementById("pressure");
        if (pressure) {
            pressure.innerText = data.pressure + " mb";
        }
        const uvIndex = document.getElementById("uvIndex");
        if (uvIndex) {
            uvIndex.innerText = data.uv_index + "";
        }
        const img = document.getElementById("weatherIcon");
        if (img) {
            img.src = data.weather_icons[0];
        }
    }
    displayLocationData(data) {
        const date = data.localtime.split(" ")[0];
        const time = data.localtime.split(" ")[1];
        const locationHeader = document.getElementById('locationHeader');
        const locationHeader2 = document.getElementById('locationHeader2');
        const localDate = document.getElementById('localDate');
        const localTime = document.getElementById('localTime');
        var fullLocation = data.name + ", " + data.region + ", " + data.country;
        if (locationHeader) {
            locationHeader.innerText = fullLocation;
        }
        if (locationHeader2) {
            locationHeader2.innerText = data.name;
        }
        if (localDate) {
            localDate.innerText = date;
        }
        if (localTime) {
            localTime.innerText = time;
        }
    }
    displayForecastPlot(data) {
        var data = JSON.parse(data.plot);
        var layout = {
            autosize: true,
            responzive: true,
            aspectratio: { x: 4, y: 3 },
        };
        window.Plotly.newPlot('plot-container', data, layout);
    }
}
APICall.url = '/data';
function getWeather() {
    console.log("main");
    new APICall("current", new Map([["location", "Ostrava"]]));
}
function getLocationInfo() {
    console.log("location");
    new APICall("location-info", new Map([["location", "Ostrava"]]));
}
function getForecastPlot() {
    console.log("forecast-plot");
    new APICall("forecast-plot", new Map([["location", "Ostrava"]]));
}
