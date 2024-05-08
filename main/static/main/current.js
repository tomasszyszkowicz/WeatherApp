"use strict";
function submitLocation() {
    const locationInput = document.getElementById('locationInput');
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location, null);
    updateRecentLocations(location);
}
function createRedirect(endpoint, spanId) {
    console.log("clicked");
    const span = document.getElementById(spanId);
    if (span) {
        console.log("span");
        const spanContent = span.textContent;
        redirect(endpoint, spanContent, null);
    }
    else {
        console.log("span not found");
    }
}
function createDateRedirect(endpoint, spanId) {
    const location = getQueryParamater('location');
    const span = document.getElementById(spanId);
    if (span) {
        const date = span.textContent;
        redirect(endpoint, location, date);
    }
    else {
        console.log("span not found");
    }
}
