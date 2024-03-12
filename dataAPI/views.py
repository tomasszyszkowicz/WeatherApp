from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse

from .utility.read_utils.forecast import ForecastWeather
from .utility.read_utils.current import CurrentWeather

import json
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .utility.read_utils.forecast import ForecastWeather
from .utility.read_utils.current import CurrentWeather
import json
import plotly.graph_objs as go
import plotly.graph_objs as go


def api_check(request):
    """
    API endpoint to check if the API is running.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - JsonResponse: JSON response indicating whether the API is running.
    """
    return JsonResponse({"message": "api is running"})


def current_weather(request):
    """
    API endpoint to get the current weather.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the current weather information.
    """
    return CurrentWeather(request).get_current_weather()


def location_info(request):
    """
    API endpoint to get the location information.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the location information.
    """
    return CurrentWeather(request).get_location_info()


def forecast_weather(request):
    """
    API endpoint to get the forecast weather.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the forecast weather information.
    """
    return ForecastWeather(request).get_forecast_weather()


def forecast_weather_data(request):
    """
    API endpoint to get the forecast weather data to display.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the forecast weather data.
    """
    return ForecastWeather(request).get_forecast_data_to_display()


def forecast_weather_plot(request):
    """
    API endpoint to get the forecast weather plot.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the forecast weather plot.
    """
    return ForecastWeather(request).forecast_plot()


def forecast_speficic_day(request):
    """
    API endpoint to get the forecast for a specific day.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the forecast for the specific day.
    """
    date = request.GET.get("date")
    return ForecastWeather(request).get_specific_forecast_day(date)


def forecast_speficic_day_plot(request):
    """
    API endpoint to get the forecast plot for a specific day.

    Parameters:
    - request: HttpRequest object representing the incoming request.

    Returns:
    - HttpResponse: HTTP response containing the forecast plot for the specific day.
    """
    date = request.GET.get("date")
    return ForecastWeather(request).day_plot(date)
