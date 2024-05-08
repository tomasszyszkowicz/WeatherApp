function getQueryParamater(name: string) : string | null{
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getCookie(name: string) : string | null{
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

async function setupPage() {
    setTimeout(function() {
        if (leftContainer) {
            leftContainer.classList.add('visible');
        }
        if (toggleButton) {
            toggleButton.innerHTML = '<b>⟨</b>';
            toggleButton.classList.add('visible');
        }
        isLeftContainerVisible = true;
    }, 10);
    const location: string | null = getQueryParamater('location');
    const usernameElement = document.getElementById("username");
    const username: string | null = usernameElement ? usernameElement.textContent : null;
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
            } else {
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
        console.log(date)
    }
    if (!location || !username) {
        return;
    }
    await Promise.all([
        getAllData(location, username, date),
    ]);

    const mainContainer = document.querySelector('.main-container') as HTMLElement;
    if (mainContainer) {
        mainContainer.style.display = 'block';
    }
    const loaderContainer = document.querySelector('.loader-container') as HTMLElement;
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
    }
    const searchContainer = document.getElementById('searchContainer') as HTMLElement;
    if (searchContainer) {
        searchContainer.style.display = 'block';
    }

};

function convertToTime(stringTime: string): string {
    // If the stringTime is "0", return "0:00"
    if (stringTime === "0") {
        return "0:00";
    }

    // If the stringTime is three characters long, convert it to "X:00" format
    if (stringTime.length === 3) {
        const hour: string = stringTime.charAt(0);
        return hour + ":00";
    }

    // If the stringTime is longer, extract hours and minutes
    const hours: string = stringTime.slice(0, 2);
    const minutes: string = stringTime.slice(2);

    // Concatenate hours and minutes with a colon in between
    const formattedTime: string = hours + ":" + minutes;

    return formattedTime;
}
