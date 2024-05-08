"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getQueryParamater(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop();
        if (cookieValue) {
            return cookieValue.split(';').shift() || null;
        }
    }
    return null;
}
function setupPage() {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(function () {
            if (leftContainer) {
                leftContainer.classList.add('visible');
            }
            if (toggleButton) {
                toggleButton.innerHTML = '<b>⟨</b>';
                toggleButton.classList.add('visible');
            }
            isLeftContainerVisible = true;
        }, 10);
        const location = getQueryParamater('location');
        const usernameElement = document.getElementById("username");
        const username = usernameElement ? usernameElement.textContent : null;
        const locationHeader = document.getElementById('locationHeader');
        if (locationHeader) {
            locationHeader.textContent = getQueryParamater('location');
        }
        const leftContainer = document.querySelector('.left-container');
        const toggleButton = document.getElementById('toggleButton');
        let isLeftContainerVisible = false; // Initially hidden
        if (toggleButton && leftContainer) {
            toggleButton.addEventListener('click', function () {
                console.log('Button clicked');
                if (isLeftContainerVisible) {
                    leftContainer.classList.remove('visible');
                    toggleButton.innerHTML = '<b>⟩</b>';
                    toggleButton.classList.remove('visible');
                }
                else {
                    leftContainer.classList.add('visible');
                    toggleButton.innerHTML = '<b>⟨</b>';
                    toggleButton.classList.add('visible');
                }
                isLeftContainerVisible = !isLeftContainerVisible; // Toggle the visibility state
            });
        }
        var date = getQueryParamater('date');
        if (!date) {
            date = new Date().toISOString().split('T')[0];
            console.log(date);
        }
        if (!location || !username) {
            return;
        }
        yield Promise.all([
            getAllData(location, username, date),
        ]);
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.display = 'block';
        }
        const loaderContainer = document.querySelector('.loader-container');
        if (loaderContainer) {
            loaderContainer.style.display = 'none';
        }
        const searchContainer = document.getElementById('searchContainer');
        if (searchContainer) {
            searchContainer.style.display = 'block';
        }
    });
}
;
