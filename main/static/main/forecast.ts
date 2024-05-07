async function setupPage() {
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
    if (!location || !username) {
        return;
    }
    await Promise.all([
        getAllData(location, username),
    ]);

    const mainContainer = document.querySelector('.main-container') as HTMLElement;
    if (mainContainer) {
        mainContainer.style.display = 'block';
    }
    const loaderContainer = document.querySelector('.loader-container') as HTMLElement;
    if (loaderContainer) {
        loaderContainer.style.display = 'none';
    }
};