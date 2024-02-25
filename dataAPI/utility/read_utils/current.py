from django.http import JsonResponse
from ..weatherstack.weatherstack_api_calls import CurrentAPICall


class CurrentWeather:

    def __init__(self, request):

        data = CurrentAPICall(request).get_data()
        self.current_weather = data["current"]
        self.location_info = data["location"]

    def get_location_info(self):
        return JsonResponse(self.location_info)
    
    def get_current_weather(self):
        return JsonResponse(self.current_weather)