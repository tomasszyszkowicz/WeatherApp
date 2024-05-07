function submitLocation() {
    const locationInput: HTMLInputElement | null = document.getElementById('locationInput') as HTMLInputElement;
    if (!locationInput) {
        return;
    }
    const location = locationInput.value;
    redirect("current", location);
}