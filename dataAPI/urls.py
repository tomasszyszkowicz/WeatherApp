from django.urls import path

from . import views

urlpatterns = [
    path("api/", views.api_check, name="api"),
    path("current/", views.current_weather, name="current"),
    path("location-info/", views.location_info),
    #path("historical/", views.historical_weather, name="historical"),
    path("forecast/", views.forecast_weather, name="forecast"),
    path("forecast-plot/", views.forecast_weather_plot),
    path("forecast-data/", views.forecast_weather_data),
    path("forecast-day/", views.forecast_speficic_day),
    path("forecast-day-plot/", views.forecast_speficic_day_plot),

]