class APICall {

    private url: string;
    private endpoint: string;
    private params: Map<string, string>;

    constructor(url: string, endpoint: string, params: Map<string, string>) {
        this.url = url;
        this.endpoint = endpoint;
        this.params = params;
        this.getCall();
    }

    getCall(): Promise<any> {
        let url: string = this.url + '/' + this.endpoint + '?';
        this.params.forEach((value, key) => {
            url += key + '=' + value + '&';
        });
        url = url.substring(0, url.length - 1);

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (this.endpoint === "current") {
                    this.displayCurrentData(data);
                } else if (this.endpoint === "location-info") {
                    this.displayLocationData(data);
                } else if (this.endpoint === "forecast-plot") {
                    this.displayForecastPlot(data);
                } else if (this.endpoint === "forecast-data") {
                    this.displayForecastData(data);
                } else if (this.endpoint === "favorite-locations") {
                    this.displayFavoriteLocations(data);
                } else if (this.endpoint === "recent-locations") {
                    this.displayRecentLocations(data);
                } else if (this.endpoint === "forecast-day-plot") {
                    this.displayDayForecastPlot(data);
                } else if (this.endpoint === "forecast-day") {
                    this.displayForecastDayData(data);
                }
                return data; // Return data for chaining promises
            });
    }

    displayCurrentData(data: CurrentWeatherData) {
        const weatherDescription: HTMLElement | null = document.getElementById("weatherDescription");
        if (weatherDescription) {
            weatherDescription.innerText = data.weather_descriptions[0];
        }
        const temperature: HTMLElement | null = document.getElementById("temperature");
        if (temperature) {
            temperature.innerText = data.temperature + " °C";
        }
        const headerTemperature: HTMLElement | null = document.getElementById("headerTemperature");
        if (headerTemperature) {
            headerTemperature.innerText = data.temperature + " °C";
        }
        const humidity: HTMLElement | null = document.getElementById("humidity");
        if (humidity) {
            humidity.innerText = data.humidity + "%";
        }
        const windSpeed: HTMLElement | null = document.getElementById("windSpeed");
        if (windSpeed) {
            windSpeed.innerText = data.wind_speed + " km/h";
        }
        const precipitation: HTMLElement | null = document.getElementById("precipitation");
        if (precipitation) {
            precipitation.innerText = data.precip + " mm";
        }
        const pressure: HTMLElement | null = document.getElementById("pressure");
        if (pressure) {
            pressure.innerText = data.pressure + " mb";
        }
        const uvIndex: HTMLElement | null = document.getElementById("uvIndex");
        if (uvIndex) {
            uvIndex.innerText = data.uv_index + "";
        }
        const img: HTMLImageElement | null = document.getElementById("weatherIcon") as HTMLImageElement;
        if (img) {
            img.src = data.weather_icons[0];
        }
    }

    displayLocationData(data: LocationData) {
        const date: string = data.localtime.split(" ")[0];
        const time: string = data.localtime.split(" ")[1];

        const locationHeader: HTMLElement | null = document.getElementById('locationHeader');
        const locationHeader2: HTMLElement | null = document.getElementById('locationHeader2');
        const localDate: HTMLElement | null = document.getElementById('localDate');
        const headerDate: HTMLElement | null = document.getElementById('headerDate');
        const localTime: HTMLElement | null = document.getElementById('localTime');
        const timezone: HTMLElement | null = document.getElementById('timezone');
        const utcOffset: HTMLElement | null = document.getElementById('utcOffset');

        var fullLocation: string = data.name + ", " + data.region + ", " + data.country;

        if (locationHeader) {
            locationHeader.innerText = fullLocation;
        }

        if (locationHeader2) {
            locationHeader2.innerText = data.name;
        }

        if (localDate) {
            localDate.innerText = date;
        }

        if (headerDate) {
            headerDate.innerText = getQueryParamater('date') || '';
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

    displayForecastData(data: ForecastData) {
        const div1: HTMLElement | null = document.getElementById('div1');
        const div2: HTMLElement | null = document.getElementById('div2');
        const div3: HTMLElement | null = document.getElementById('div3');
        const div4: HTMLElement | null = document.getElementById('div4');
        const div5: HTMLElement | null = document.getElementById('div5');
        const div6: HTMLElement | null = document.getElementById('div6');
        const div7: HTMLElement | null = document.getElementById('div7');

        const day1: HTMLElement | null = document.getElementById('day1');
        const day2: HTMLElement | null = document.getElementById('day2');
        const day3: HTMLElement | null = document.getElementById('day3');
        const day4: HTMLElement | null = document.getElementById('day4');
        const day5: HTMLElement | null = document.getElementById('day5');
        const day6: HTMLElement | null = document.getElementById('day6');
        const day7: HTMLElement | null = document.getElementById('day7');

        const icon1: HTMLImageElement | null = document.getElementById('icon1') as HTMLImageElement;
        const icon2: HTMLImageElement | null = document.getElementById('icon2') as HTMLImageElement;
        const icon3: HTMLImageElement | null = document.getElementById('icon3') as HTMLImageElement;
        const icon4: HTMLImageElement | null = document.getElementById('icon4') as HTMLImageElement;
        const icon5: HTMLImageElement | null = document.getElementById('icon5') as HTMLImageElement;
        const icon6: HTMLImageElement | null = document.getElementById('icon6') as HTMLImageElement;
        const icon7: HTMLImageElement | null = document.getElementById('icon7') as HTMLImageElement;

        const temperature1: HTMLElement | null = document.getElementById('temperature1');
        const temperature2: HTMLElement | null = document.getElementById('temperature2');
        const temperature3: HTMLElement | null = document.getElementById('temperature3');
        const temperature4: HTMLElement | null = document.getElementById('temperature4');
        const temperature5: HTMLElement | null = document.getElementById('temperature5');
        const temperature6: HTMLElement | null = document.getElementById('temperature6');
        const temperature7: HTMLElement | null = document.getElementById('temperature7');

        if (div1) {
            div1.setAttribute("data-date", data.dates[0]);
        }
        if (div2) {
            div2.setAttribute("data-date", data.dates[1]);
        }
        if (div3) {
            div3.setAttribute("data-date", data.dates[2]);
        }
        if (div4) {
            div4.setAttribute("data-date", data.dates[3]);
        }
        if (div5) {
            div5.setAttribute("data-date", data.dates[4]);
        }
        if (div6) {
            div6.setAttribute("data-date", data.dates[5]);
        }
        if (div7) {
            div7.setAttribute("data-date", data.dates[6]);
        }

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
            temperature1.innerText = data.temperatures[0] + " °C";
        }
        if (temperature2) {
            temperature2.innerText = data.temperatures[1] + " °C";
        }
        if (temperature3) {
            temperature3.innerText = data.temperatures[2] + " °C";
        }
        if (temperature4) {
            temperature4.innerText = data.temperatures[3] + " °C";
        }
        if (temperature5) {
            temperature5.innerText = data.temperatures[4] + " °C";
        }
        if (temperature6) {
            temperature6.innerText = data.temperatures[5] + " °C";
        }
        if (temperature7) {
            temperature7.innerText = data.temperatures[6] + " °C";
        }
    }

    displayForecastPlot(data: any) {
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
            (window as any).Plotly.newPlot('plot-container', data, layout, config);
        }
    }

    displayDayForecastPlot(data: any) {
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
            (window as any).Plotly.newPlot('day-plot-container', data, layout, config);
        }
    }

    displayFavoriteLocations(data: FavoriteLocation) {
        console.log(data);
        console.log("ahoj");
        const location1: HTMLElement | null = document.getElementById('favoriteLocation1');
        const location2: HTMLElement | null = document.getElementById('favoriteLocation2');
        const location3: HTMLElement | null = document.getElementById('favoriteLocation3');

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

    displayRecentLocations(data: RecentLocation) {
        console.log("recentiryyyyy!!!!");
        console.log(data);
        const location1: HTMLElement | null = document.getElementById('recentLocation1');
        const location2: HTMLElement | null = document.getElementById('recentLocation2');
        const location3: HTMLElement | null = document.getElementById('recentLocation3');
        const location4: HTMLElement | null = document.getElementById('recentLocation4');
        const location5: HTMLElement | null = document.getElementById('recentLocation5');
        const location6: HTMLElement | null = document.getElementById('recentLocation6');

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

    displayForecastDayData(data: any) {
        const sunset: HTMLElement | null = document.getElementById('sunset');
        const sunrise: HTMLElement | null = document.getElementById('sunrise');
        const maxtemp: HTMLElement | null = document.getElementById('maxtemp');
        const mintemp: HTMLElement | null = document.getElementById('mintemp');

        if (sunset) {
            sunset.innerText = data.astro.sunset;
        }
        if (sunrise) {
            sunrise.innerText = data.astro.sunrise;
        }
        if (maxtemp) {
            maxtemp.innerText = data.maxtemp + " °C";
        }
        if (mintemp) {
            mintemp.innerText = data.mintemp + " °C";
        }

        for (let i = 0; i < data.hourly.length; i++) {
            const hourElement: HTMLElement | null = document.getElementById(`hour${i + 1}`);
            if (hourElement) {
                hourElement.innerHTML = `${convertToTime(data.hourly[i].time)}:`; // Assuming temperatures are in Celsius
            }
            const temperatureElement: HTMLElement | null = document.getElementById(`hourTemperature${i + 1}`);
            if (temperatureElement) {
                temperatureElement.innerHTML = `${data.hourly[i].temperature} °C`; // Assuming temperatures are in Celsius
            }
            const iconElement: HTMLImageElement | null = document.getElementById(`hour${i + 1}img`) as HTMLImageElement;
            if (iconElement) {
                iconElement.src = data.hourly[i].weather_icons[0];
            }
        }
    }
}

function getWeather(location: string): void {
    new APICall("/data", "current", new Map([["location", location]]));
}

function getLocationInfo(location: string): void {
    new APICall("/data", "location-info", new Map([["location", location]]));
}

function getForecastPlot(location: string): void {
    new APICall("/data", "forecast-plot", new Map([["location", location]]));
}

function getForecastData(location: string): void {
    new APICall("/data", "forecast-data", new Map([["location", location]]));
}

function getFavoriteLocations(username: string): void {
    new APICall("", "favorite-locations", new Map([["username", username]]));
}

function getRecentLocations(username: string): void {
    new APICall("", "recent-locations", new Map([["username", username]]));
}

function getAllData(location: string, username: string, date: string): Promise<any[]> {
    const promises: Promise<any>[] = [
        new APICall("/data", "current", new Map([["location", location]])).getCall(),
        new APICall("/data", "location-info", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-plot", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-data", new Map([["location", location]])).getCall(),
        new APICall("/data", "forecast-day-plot", new Map([["location", location], ["date", date]])).getCall(),
        new APICall("/data", "forecast-day", new Map([["location", location], ["date", date]])).getCall(),
        new APICall("", "favorite-locations", new Map([["username", username]])).getCall(),
        new APICall("", "recent-locations", new Map([["username", username]])).getCall()
    ];

    return Promise.all(promises);
}

function getDayName(dateString: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
}

interface CurrentWeatherData {
    weather_descriptions: string[];
    temperature: number;
    humidity: number;
    wind_speed: number;
    precip: number;
    pressure: number;
    uv_index: number;
    weather_icons: string[];
}

interface LocationData {
    name: string;
    country: string;
    region: string;
    localtime: string;
    timezone_id: string;
    utc_offset: string;
}

interface ForecastData {
    temperatures: number[];
    weather_icons: string[];
    dates: string[];
}

interface FavoriteLocation {
    location1: string;
    location2: string;
    location3: string;
}

interface RecentLocation {
    location1: string;
    location2: string;
    location3: string;
    location4: string;
    location5: string;
    location6: string;
}