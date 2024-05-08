function redirect(endpoint: string, location: string | null = null, date: string | null): void{
    var url = '';
    url += `/${endpoint}`;
    console.log(location)
    if (!(location === null)) {
        url+= `?location=${location}`;
    } else {
        location = getQueryParamater('location');
        url+= `?location=${location}`;
    }
        
    if (date){
        url+= `&date=${date}`;
    }

    window.location.href = url;   
}