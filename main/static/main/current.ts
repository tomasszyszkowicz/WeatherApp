function submitLocation(): void {
    const locationInput: HTMLInputElement | null = document.getElementById('locationInput') as HTMLInputElement;
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location, null);
    updateRecentLocations(location);
}

function createRedirect(endpoint: string, spanId: string): void {
    console.log("clicked");
    const span = document.getElementById(spanId);
    if (span) {
        console.log("span");
        const spanContent = span.textContent;
        redirect(endpoint, spanContent, null);
    } else {
        console.log("span not found");
    }
}

function createDateRedirect(endpoint: string, spanId: string): void {
    const location = getQueryParamater('location');
    const span = document.getElementById(spanId);
    if (span) {
        const date = span.textContent;
        redirect(endpoint, location, date);
    } else {
        console.log("span not found");
    }
}