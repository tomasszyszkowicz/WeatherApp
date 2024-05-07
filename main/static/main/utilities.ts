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