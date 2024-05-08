"use strict";
function updateRecentLocations(location) {
    const username = document.getElementById('username').textContent;
    const url = `/update-recent-locations/${username}/`;
    if (username === null) {
        console.log("Username not found");
        return;
    }
    const csrfToken = getCookie('csrftoken');
    if (csrfToken === null) {
        console.log("CSRF token not found");
        return;
    }
    // Define the POST request options
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ 'location': location }) // Convert location to JSON string
    };
    // Make the POST request using fetch
    fetch(url, options)
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update recent locations');
        }
        return response.json();
    })
        .then(data => {
        console.log(data);
        getRecentLocations(username);
    })
        .catch(error => {
        console.error('Error:', error); // Log any errors
        // Handle error
    });
}
function updateFavoriteLocations(username, locationData) {
    // Define the endpoint URL
    const url = `/update-favorite-locations/${username}/`;
    console.log(locationData);
    const csrfToken = getCookie('csrftoken');
    if (csrfToken === null) {
        console.log("CSRF token not found");
        return;
    }
    // Define the PATCH request options
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken // Make sure to replace 'csrftoken' with the name of your CSRF token cookie
        },
        body: JSON.stringify(locationData) // Convert locationData to JSON string
    };
    // Make the PATCH request using fetch
    fetch(url, options)
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update favorite locations');
        }
        return response.json();
    })
        .then(data => {
        console.log(data); // Log the response data
        // Handle successful response
    })
        .catch(error => {
        console.error('Error:', error); // Log any errors
        // Handle error
    });
}
