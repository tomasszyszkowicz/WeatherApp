from django.urls import path

from . import views

urlpatterns = [
    path("api/", views.api_check, name="api"),
    path("current/", views.current_weather, name="current"),
    path("historical/", views.historical_weather, name="historical"),
    path("forecast/", views.forecast_weather, name="forecast"),
    path("forecast-plot/", views.forecast_weather_plot),
    path("forecast-data/", views.forecast_weather_data)
]