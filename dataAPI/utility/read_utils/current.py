from django.http import JsonResponse
from ..weatherstack.weatherstack_api_calls import CurrentAPICall


class CurrentWeather:
    """
    Class to handle current weather data and location information.
    """

    def __init__(self, request):
        """
        Initializes the CurrentWeather object.

        Parameters:
        - request: The HTTP request object.

        This method retrieves the current weather data and location information
        using the CurrentAPICall class and stores them in instance variables.
        """
        data = CurrentAPICall(request).get_data()
        self.current_weather = data["current"]
        self.location_info = data["location"]

    def get_location_info(self):
        """
        Returns the location information as a JSON response.

        Returns:
        - JsonResponse: The JSON response containing the location information.
        """
        return JsonResponse(self.location_info)

    def get_current_weather(self):
        """
        Returns the current weather data as a JSON response.

        Returns:
        - JsonResponse: The JSON response containing the current weather data.
        """
        return JsonResponse(self.current_weather)
