"use strict";
function submitLocation() {
    const locationInput = document.getElementById('locationInput');
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location);
    updateRecentLocations(location);
}
