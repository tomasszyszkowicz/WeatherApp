function fetchSpecificDay(location, date) {
    console.log(date);
    const url = `/data/forecast-day/?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`;
    console.log(url);
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("sunrise").innerHTML = data.astro.sunrise;
            document.getElementById("sunset").innerHTML = data.astro.sunset;
            document.getElementById("maxTemp").innerHTML = data.maxtemp;
            document.getElementById("minTemp").innerHTML = data.mintemp;

            displayHourlyTemperatures(data.hourly);
        })
        .catch(error => console.error('Error:', error));
}

function createDateString() {
    // Get the current date
    var currentDate = new Date();

    // Extract year, month, and day from the date
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    var day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as "year-month-day"
    var formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
}

function displayHourlyTemperatures(data) {
    const hourlyTemperaturesDiv = document.getElementById('hourlyTemperatures');
    let html = '';
    data.forEach(entry => {
        html += `<p>${convertToTimeFormat(entry.time)}, Temperature: ${entry.temperature}°C <img src="${entry.weather_icons[0]}" alt="Weather icon" width="30px" height="30px"></p>`;
    });
    hourlyTemperaturesDiv.innerHTML = html;
}

function convertToTimeFormat(input) {
    let hours = Math.floor(input / 100);
    let minutes = input % 100;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

function fetchAndRenderPlot(location, date) {
    const url = `/data/forecast-day-plot/?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        renderPlot(data.plot);
    })
    .catch(error => console.error('Error fetching plot data:', error));
}

function renderPlot(plotData) {
    console.log(typeof plotData);
    
    var data = JSON.parse(plotData);

    var layout = {
        autosize: true,
        responsive: true,
    };

    Plotly.newPlot('plot', data, layout);
}