"use strict";
function submitLocation() {
    const locationInput = document.getElementById('locationInput');
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location);
}
function createRedirect(endpoint, spanId) {
    console.log("clicked");
    const span = document.getElementById(spanId);
    if (span) {
        console.log("span");
        const spanContent = span.textContent;
        redirect(endpoint, spanContent);
    }
    else {
        console.log("span not found");
    }
}
