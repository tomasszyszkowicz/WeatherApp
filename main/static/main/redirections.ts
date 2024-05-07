function redirect(endpoint: string, location: string | null = null): void{
    if (location === null) {
        location = getQueryParamater('location');
        window.location.href = `/${endpoint}?location=${location}`;
    }
    window.location.href = `/${endpoint}?location=${location}`;   
}