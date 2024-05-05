class APICall {

    private static url: string = '/data';
   
    private endpoint: string;
    private params: Map<string, string>;

    constructor(endpoint: string, params: Map<string, string>) {
        this.endpoint = endpoint;
        this.params = params;
        this.getCall();
    }

    getCall() {
        //add params to url
        let url: string = APICall.url + '/' + this.endpoint + '?';
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
                } else if (this.endpoint === "location-info") {
                    this.displayLocationData(data);
                } else if (this.endpoint === "forecast-plot") {
                    this.displayForecastPlot(data);
                } else if (this.endpoint === "forecast-data") {
                    this.displayForecastData(data);
                }
            });
    }

    displayCurrentData(data: CurrentWeatherData) {
        const weatherDescription: HTMLElement | null = document.getElementById("weatherDescription");
        if (weatherDescription) {
            weatherDescription.innerText = data.weather_descriptions[0];
        }
        const temperature: HTMLElement | null = document.getElementById("temperature");
        if (temperature) {
            temperature.innerText = data.temperature + "°C";
        }
        const headerTemperature: HTMLElement | null = document.getElementById("headerTemperature");
        if (headerTemperature) {
            headerTemperature.innerText = data.temperature + "°C";
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
        const day2: HTMLElement | null = document.getElementById('day2');
        const day3: HTMLElement | null = document.getElementById('day3');

        const temperature2: HTMLElement | null = document.getElementById('temperature2');
        const temperature3: HTMLElement | null = document.getElementById('temperature3');
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

    displayForecastPlot(data: any) {
        var data = JSON.parse(data.plot);
        var layout = {
            autosize: true,
        };
        var config = { responsive: true };
        (window as any).Plotly.newPlot('plot-container', data, layout, config);
    }
}

function getWeather(location: string): void {
    new APICall("current", new Map([["location", location]]));
}

function getLocationInfo(location: string): void {
    new APICall("location-info", new Map([["location", location]]));
}

function getForecastPlot(location: string): void {
    new APICall("forecast-plot", new Map([["location", location]]));
}

function getForecastData(location: string): void {
    new APICall("forecast-data", new Map([["location", location]]));
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
    dates: string[];
}