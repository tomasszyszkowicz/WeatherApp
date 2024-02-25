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
            //document.getElementById('time').innerText = data.time;
           
        
        })
        .catch(error => console.error('Error:', error));

    

    fetchAndRenderPlot(location);
    fetchData(location);
    fetchLocationData(location);



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

function fetchLocationData(location) {
    const url = `/data/location-info/?location=${encodeURIComponent(location)}`;

    fetch(url)
        .then(response => response.json())  // Parse the JSON from the response                 
        .then(data => {
            // Split the localtime string into date and time
            var [date, time] = data.localtime.split(' ');

            // Update the page elements with the new data
            document.getElementById('localDate').innerText = date;
            document.getElementById('localTime').innerText = time;
        })
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
                const dateObject = new Date(date); // Convert date string to Date object
                
                // Get the day of the week
                const options = { weekday: 'long' };
                const dayOfWeek = dateObject.toLocaleDateString(undefined, options);
                
                // Select the corresponding day-container element
                const dayContainer = document.querySelectorAll('.day-container')[i];
                
                // Update the contents of the day-container with day of week and temperature
                dayContainer.innerHTML = `<p>${date}</p><p>${dayOfWeek}</p><p>${temperature} °C</p>`;

                // Add event listener to the day-container
                dayContainer.addEventListener('click', function() {
                    redirectToStats(data.dates[i]); // Pass the original date string to redirectToStats
                });
            }
        })
        .catch(error => console.error('Error:', error));
}
function redirectToStats(date) {
    // Get the location
    var location = document.getElementById('locationHeader').innerText;

    //only do the below if date is not defined
    if (date === undefined) {
        // Get the date
        date = document.getElementById('localDate').innerText;
    }

    // Redirect to stats page with location parameter
    window.location.href = "/stats/?location=" + location + "&date=" + date;
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

    // Return the formatted date
    console.log(formattedDate);
    return formattedDate;
}


//function to get current date and display it in the header

function displayDate() {
    var currentDate = new Date();
    var date = currentDate.toDateString();
    document.getElementById('currentDate').innerText = date;
}

//function to get current time and display it in the header

function displayTime() {        
    var currentTime = new Date();
    var time = currentTime.toLocaleTimeString();
    document.getElementById('currentTime').innerText = time;
}





