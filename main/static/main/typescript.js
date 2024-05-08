"use strict";
class APICall {
    constructor(url, endpoint, params) {
        this.url = url;
        this.endpoint = endpoint;
        this.params = params;
        this.getCall();
    }
    getCall() {
        let url = this.url + '/' + this.endpoint + '?';
        this.params.forEach((value, key) => {
            url += key + '=' + value + '&';
        });
        url = url.substring(0, url.length - 1);
        return fetch(url)
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
            else if (this.endpoint === "forecast-day-plot") {
                this.displayDayForecastPlot(data);
            }
            return data; // Return data for chaining promises
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
        const day1 = document.getElementById('day1');
        const day2 = document.getElementById('day2');
        const day3 = document.getElementById('day3');
        const day4 = document.getElementById('day4');
        const day5 = document.getElementById('day5');
        const day6 = document.getElementById('day6');
        const day7 = document.getElementById('day7');
        const icon1 = document.getElementById('icon1');
        const icon2 = document.getElementById('icon2');
        const icon3 = document.getElementById('icon3');
        const icon4 = document.getElementById('icon4');
        const icon5 = document.getElementById('icon5');
        const icon6 = document.getElementById('icon6');
        const icon7 = document.getElementById('icon7');
        const temperature1 = document.getElementById('temperature1');
        const temperature2 = document.getElementById('temperature2');
        const temperature3 = document.getElementById('temperature3');
        const temperature4 = document.getElementById('temperature4');
        const temperature5 = document.getElementById('temperature5');
        const temperature6 = document.getElementById('temperature6');
        const temperature7 = document.getElementById('temperature7');
        if (day1) {
            day1.innerText = getDayName(data.dates[0]);
        }
        if (day2) {
            day2.innerText = getDayName(data.dates[1]);
        }
        if (day3) {
            day3.innerText = getDayName(data.dates[2]);
        }
        if (day4) {
            day4.innerText = getDayName(data.dates[3]);
        }
        if (day5) {
            day5.innerText = getDayName(data.dates[4]);
        }
        if (day6) {
            day6.innerText = getDayName(data.dates[5]);
        }
        if (day7) {
            day7.innerText = getDayName(data.dates[6]);
        }
        if (icon1) {
            icon1.src = data.weather_icons[0];
        }
        if (icon2) {
            icon2.src = data.weather_icons[1];
        }
        if (icon3) {
            icon3.src = data.weather_icons[2];
        }
        if (icon4) {
            icon4.src = data.weather_icons[3];
        }
        if (icon5) {
            icon5.src = data.weather_icons[4];
        }
        if (icon6) {
            icon6.src = data.weather_icons[5];
        }
        if (icon7) {
            icon7.src = data.weather_icons[6];
        }
        if (temperature1) {
            temperature1.innerText = data.temperatures[0] + "°C";
        }
        if (temperature2) {
            temperature2.innerText = data.temperatures[1] + "°C";
        }
        if (temperature3) {
            temperature3.innerText = data.temperatures[2] + "°C";
        }
        if (temperature4) {
            temperature4.innerText = data.temperatures[3] + "°C";
        }
        if (temperature5) {
            temperature5.innerText = data.temperatures[4] + "°C";
        }
        if (temperature6) {
            temperature6.innerText = data.temperatures[5] + "°C";
        }
        if (temperature7) {
            temperature7.innerText = data.temperatures[6] + "°C";
        }
    }
    displayForecastPlot(data) {
        var data = JSON.parse(data.plot);
        var layout = {
            autosize: true,
        };
        var config = {
            responsive: true,
            displayModeBar: false
        };
        const plotContainer = document.getElementById('plot-container');
        if (plotContainer) {
            window.Plotly.newPlot('plot-container', data, layout, config);
        }
    }
    displayDayForecastPlot(data) {
        var data = JSON.parse(data.plot);
        var layout = {
            autosize: true,
        };
        var config = {
            responsive: true,
            displayModeBar: false
        };
        const plotContainer = document.getElementById('day-plot-container');
        if (plotContainer) {
            window.Plotly.newPlot('day-plot-container', data, layout, config);
        }
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
function getAllData(location, username, date) {
    const promises = [
        new APICall("/data", "current", new Map([["location", location]])).getCall(),
        new APICall("/data", "location-info", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-plot", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-data", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-day-plot", new Map([["location", location], ["date", date]])).getCall(),
        new APICall("", "favorite-locations", new Map([["username", username]])).getCall(),
        new APICall("", "recent-locations", new Map([["username", username]])).getCall()
    ];
    return Promise.all(promises);
}
function getDayName(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
}
