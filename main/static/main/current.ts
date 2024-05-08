function submitLocation(): void {
    const locationInput: HTMLInputElement | null = document.getElementById('locationInput') as HTMLInputElement;
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location);
}

function createRedirect(endpoint: string, spanId: string): void {
    console.log("clicked");
    const span = document.getElementById(spanId);
    if (span) {
        console.log("span");
        const spanContent = span.textContent;
        redirect(endpoint, spanContent);
    } else {
        console.log("span not found");
    }
}