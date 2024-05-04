class APICall {

    private static url: string = '/data';
   
    private endpoint: string;
    private params: Map<string, string>;

    constructor(endpoint: string, params: Map<string, string>) {
        this.endpoint = endpoint;
        this.params = params;
        
    }

    getCall() {
        //add params to url
        let url = APICall.url + '/' + this.endpoint + '?';
        this.params.forEach((value, key) => {
            url += key + '=' + value + '&';
        });
        //remove last &
        url = url.substring(0, url.length - 1);
        //make get call
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            console.log(jsonResponse);
        });
    }

}

function main(): void {
    new APICall("current", new Map([["location", "Ostrava"]]));
}