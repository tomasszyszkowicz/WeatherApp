"use strict";
class APICall {
    constructor(url, endpoint, params) {
        this.url = url;
        this.endpoint = endpoint;
        this.params = params;
        this.getCall();
    }
    getCall() {
        //add params to url
        let url = this.url + '/' + this.endpoint + '?';
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
            if (this.endpoint === "current") {
                this.displayCurrentData(data);
            }
            else if (this.endpoint === "location-info") {
                this.displayLocationData(data);
            }
            else if (this.endpoint === "forecast-plot") {
                this.displayForecastPlot(data);
            }
            else if (this.endpoint === "forecast-data") {
                this.displayForecastData(data);
            }
            else if (this.endpoint === "favorite-locations") {
                this.displayFavoriteLocations(data);
            }
            else if (this.endpoint === "recent-locations") {
                this.displayRecentLocations(data);
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
        const headerTemperature = document.getElementById("headerTemperature");
        if (headerTemperature) {
            headerTemperature.innerText = data.temperature + "°C";
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
        const timezone = document.getElementById('timezone');
        const utcOffset = document.getElementById('utcOffset');
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
        if (timezone) {
            timezone.innerText = data.timezone_id;
        }
        if (utcOffset) {
            utcOffset.innerText = data.utc_offset;
        }
    }
    displayForecastData(data) {
        const day2 = document.getElementById('day2');
        const day3 = document.getElementById('day3');
        const temperature2 = document.getElementById('temperature2');
        const temperature3 = document.getElementById('temperature3');
        if (day2) {
            day2.innerText = data.dates[1];
        }
        if (day3) {
            day3.innerText = data.dates[2];
        }
        if (temperature2) {
            temperature2.innerText = data.temperatures[1] + "°C";
        }
        if (temperature3) {
            temperature3.innerText = data.temperatures[2] + "°C";
        }
    }
    displayForecastPlot(data) {
        var data = JSON.parse(data.plot);
        var layout = {
            autosize: true,
        };
        var config = { responsive: true };
        window.Plotly.newPlot('plot-container', data, layout, config);
    }
    displayFavoriteLocations(data) {
        console.log(data);
        console.log("ahoj");
        const location1 = document.getElementById('favoriteLocation1');
        const location2 = document.getElementById('favoriteLocation2');
        const location3 = document.getElementById('favoriteLocation3');
        if (location1) {
            console.log("ahoj");
            location1.innerText = data.location1;
        }
        if (location2) {
            location2.innerText = data.location2;
        }
        if (location3) {
            location3.innerText = data.location3;
        }
    }
    displayRecentLocations(data) {
        console.log("recentiryyyyy!!!!");
        console.log(data);
        const location1 = document.getElementById('recentLocation1');
        const location2 = document.getElementById('recentLocation2');
        const location3 = document.getElementById('recentLocation3');
        const location4 = document.getElementById('recentLocation4');
        const location5 = document.getElementById('recentLocation5');
        const location6 = document.getElementById('recentLocation6');
        if (location1) {
            location1.innerText = data.location1;
        }
        if (location2) {
            location2.innerText = data.location2;
        }
        if (location3) {
            location3.innerText = data.location3;
        }
        if (location4) {
            location4.innerText = data.location4;
        }
        if (location5) {
            location5.innerText = data.location5;
        }
        if (location6) {
            location6.innerText = data.location6;
        }
    }
}
function getWeather(location) {
    new APICall("/data", "current", new Map([["location", location]]));
}
function getLocationInfo(location) {
    new APICall("/data", "location-info", new Map([["location", location]]));
}
function getForecastPlot(location) {
    new APICall("/data", "forecast-plot", new Map([["location", location]]));
}
function getForecastData(location) {
    new APICall("/data", "forecast-data", new Map([["location", location]]));
}
function getFavoriteLocations(username) {
    new APICall("", "favorite-locations", new Map([["username", username]]));
}
function getRecentLocations(username) {
    new APICall("", "recent-locations", new Map([["username", username]]));
}
