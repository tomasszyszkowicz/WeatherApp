from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from .utility.weatherstack_api_calls import (
    CurrentWeather,
    HistoricalWeather,
    ForecastWeather,
)
import json
import plotly.graph_objs as go

# Create your views here.


def api_check(request):
    return JsonResponse({"message": "api is running"})


def current_weather(request):
    return CurrentWeather(request).get_current_weather()


def historical_weather(request):
    return HistoricalWeather("Ostrava").get_historical_weather()


def forecast_weather(request):
    return ForecastWeather(request).get_forecast_weather()

def forecast_weather_data(request):
    return ForecastWeather(request).get_forecast_data_to_display()

def forecast_weather_plot(request):
    return ForecastWeather(request).forecast_plot()
