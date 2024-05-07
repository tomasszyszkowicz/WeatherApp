"use strict";
function redirect(endpoint, location = null) {
    if (location === null) {
        location = getQueryParamater('location');
        window.location.href = `/${endpoint}?location=${location}`;
    }
    window.location.href = `/${endpoint}?location=${location}`;
}
