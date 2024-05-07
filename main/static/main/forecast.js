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
function setupPage() {
    return __awaiter(this, void 0, void 0, function* () {
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
        if (!location || !username) {
            return;
        }
        yield Promise.all([
            getAllData(location, username),
        ]);
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.display = 'block';
        }
        const loaderContainer = document.querySelector('.loader-container');
        if (loaderContainer) {
            loaderContainer.style.display = 'none';
        }
    });
}
;
