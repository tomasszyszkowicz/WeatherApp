function submitLocation(location){

    if (location === undefined) {
        location = document.getElementById("locationInput").value;
    }
    console.log(location);

    let url = '/data/current/?location=' + encodeURIComponent(location);

    fetch(url)  
        .then(response => response.json())
        .then(data => {
            // Updating page elements from the new json object
            // The view on /fetch-data url is returning a json object every 20 seconds
            document.getElementById("locationHeader").innerText = location;
            document.getElementById("weatherDescription").innerText = data.weather_descriptions[0];
            document.getElementById('weatherIcon').src = data.weather_icons[0];
            document.getElementById('temperature').innerText = data.temperature;
            document.getElementById('humidity').innerText = data.humidity;
            document.getElementById('windSpeed').innerText = data.wind_speed;
        
        })
        .catch(error => console.error('Error:', error));

    

    fetchAndRenderPlot(location);
    fetchData(location);



}

function fetchAndRenderPlot(location) {

    let url = '/data/forecast-plot/?location=' + encodeURIComponent(location);

    fetch(url)
    .then(response => response.json())
    .then(data => {
        renderPlot(data.plot);
    })
    .catch(error => console.error('Error fetching plot data:', error));
}

function renderPlot(plotData) {
    var data = JSON.parse(plotData);
    var layout = {
        autosize: true,
        responzive: true,
        
    };

    Plotly.newPlot('plot', data, layout);
}

function fetchData(location) {
    const url = `/data/forecast-data/?location=${encodeURIComponent(location)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Loop through temperatures and dates
            for (let i = 0; i < data.temperatures.length && i < data.dates.length; i++) {
                const temperature = data.temperatures[i];
                const date = data.dates[i];
                
                // Select the corresponding day-container element
                const dayContainer = document.querySelectorAll('.day-container')[i];
                
                // Update the contents of the day-container with temperature and date
                dayContainer.innerHTML = `<p>${date}</p><p>${temperature} °C</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
}