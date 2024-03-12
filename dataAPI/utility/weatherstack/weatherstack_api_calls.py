import requests
import json
from django.http import HttpRequest, HttpResponse, JsonResponse
import requests
import json
from django.http import HttpRequest, HttpResponse, JsonResponse
import plotly.graph_objs as go

import plotly.graph_objs as go


class APICall:
    """
    Base class for making API calls.
    """

    def __init__(self, url: str, params: dict):
        """
        Initialize the APICall object.

        Parameters:
            url (str): The URL of the API endpoint.
            params (dict): The parameters to be passed in the API call.
        """
        self.url = url
        self.params = params
        self.data = self.make_response()

    def make_response(self) -> dict:
        """
        Make the API call and return the response data.

        Returns:
            dict: The response data in JSON format.
        """
        response = requests.get(self.url, params=self.params)
        if response.status_code == 200:
            data = response.json()
            return data

    def get_data(self) -> dict:
        """
        Get the response data.

        Returns:
            dict: The response data.
        """
        return self.data


class WeatherstackAPICall(APICall):
    """
    Class for making Weatherstack API calls.
    """

    api_key = "9bdffa4257d1fafd190b6eb2a10f6c37"
    base_url = "https://api.weatherstack.com/"

    def __init__(self, endpoint: str, location: str):
        """
        Initialize the WeatherstackAPICall object.

        Parameters:
            endpoint (str): The API endpoint to be called.
            location (str): The location for which the weather data is requested.
        """
        self.url = WeatherstackAPICall.base_url + endpoint
        self.location = location
        self.params = {
            "access_key": WeatherstackAPICall.api_key,
            "query": self.location,
            "hourly": 1,
            "interval": 1,
        }
        super().__init__(self.url, self.params)


class CurrentAPICall(WeatherstackAPICall):
    """
    Class for making current weather API calls.
    """

    endpoint = "current"

    def __init__(self, request: HttpRequest):
        """
        Initialize the CurrentAPICall object.

        Parameters:
            request (HttpRequest): The HTTP request object.
        """
        location = request.GET.get("location")
        super().__init__(CurrentAPICall.endpoint, location)


class ForecastAPICall(WeatherstackAPICall):
    """
    Class for making forecast weather API calls.
    """

    endpoint = "forecast"

    def __init__(self, request: HttpRequest):
        """
        Initialize the ForecastAPICall object.

        Parameters:
            request (HttpRequest): The HTTP request object.
        """
        location = request.GET.get("location")
        super().__init__(ForecastAPICall.endpoint, location)
