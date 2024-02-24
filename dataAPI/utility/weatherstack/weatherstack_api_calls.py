import requests
import json
from django.http import HttpRequest, HttpResponse, JsonResponse
import plotly.graph_objs as go


class APICall:

    def __init__(self, url, params):

        self.url = url
        self.params = params
        self.data = self.make_response()

    def make_response(self):

        response = requests.get(self.url, params=self.params)

        if response.status_code == 200:

            data = response.json()
            return data

    def get_data(self):
        return JsonResponse(self.data)


class WeatherstackAPICall(APICall):

    api_key = "9bdffa4257d1fafd190b6eb2a10f6c37"
    base_url = "https://api.weatherstack.com/"

    def __init__(self, endpoint, location):

        self.url = WeatherstackAPICall.base_url + endpoint
        self.location = location

        self.params = {
            "access_key": WeatherstackAPICall.api_key,
            "query": self.location,
            "hourly": 1,
            #"interval": 1,
             
                      }

        super().__init__(self.url, self.params)


class CurrentWeather(WeatherstackAPICall):

    endpoint = "current"

    def __init__(self, request):

        location = request.GET.get("location")

        super().__init__(CurrentWeather.endpoint, location)

        self.current_weather = self.data["current"]

    def get_attribute(self, attribute):

        return self.current_weather.get(attribute)

    def get_current_weather(self):

        return JsonResponse(self.current_weather)


class ForecastAPICall(WeatherstackAPICall):
    endpoint = "forecast"

    def __init__(self, request):

        location = request.GET.get("location")

        super().__init__(ForecastAPICall.endpoint, location)

        self.forecast_weather = self.data["forecast"]

    def get_forecast_weather(self):
        return self.forecast_weather



"""
class HistoricalWeather(WeatherstackAPICall):

    endpoint = "historical"

    def __init__(self, location):

        super().__init__(HistoricalWeather.endpoint, location)

        self.historical_weather = self.data["current"]

    def get_historical_weather(self):

        return JsonResponse(self.historical_weather)
"""