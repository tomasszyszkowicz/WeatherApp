from ..weatherstack.weatherstack_api_calls import ForecastAPICall
from django.http import HttpRequest, HttpResponse, JsonResponse
from ..weatherstack.weatherstack_api_calls import ForecastAPICall
from django.http import HttpRequest, HttpResponse, JsonResponse
import plotly.graph_objs as go


class ForecastWeather:

    def __init__(self, request):
        """
        Initialize the ForecastWeather object.

        Parameters:
        - request: The HTTP request object.

        """
        data = ForecastAPICall(request).get_data()
        self.forecast_weather = data["forecast"]
        self.location_info = data["location"]
        self.location = request.GET.get("location")

    def get_forecast_data_to_display(self):
        """
        Get the forecast data to display.

        Returns:
        - JsonResponse: The forecast data in JSON format.

        """
        temperatures = [
            self.forecast_weather[date]["avgtemp"] for date in self.forecast_weather
        ]
        dates = [date for date in self.forecast_weather]
        return JsonResponse({"temperatures": temperatures, "dates": dates})

    def get_specific_forecast_day(self, date):
        """
        Get the forecast data for a specific day.

        Parameters:
        - date: The date for which to retrieve the forecast data.

        Returns:
        - JsonResponse: The forecast data for the specific day in JSON format.

        """
        specific_day_forecast = self.forecast_weather[date]
        return JsonResponse(specific_day_forecast)

    def day_plot(self, date):
        """
        Generate a plot for a specific day.

        Parameters:
        - date: The date for which to generate the plot.

        Returns:
        - JsonResponse: The plot data in JSON format.

        """
        temperatures = [
            hour["temperature"] for hour in self.forecast_weather[date]["hourly"]
        ]
        hours = [
            str(hour["time"])[:-2] + ":" + str(hour["time"])[-2:]
            for hour in self.forecast_weather[date]["hourly"]
        ]

        # Handle the special case of 0:00
        if hours[0] == ":0":
            hours[0] = "0:00"
        print(temperatures)
        print(hours)

        # Create a plot from the temperatures and hours
        plot = go.Figure()
        plot.add_trace(
            go.Scatter(
                x=hours, y=temperatures, mode="lines+markers", name="Temperature"
            )
        )
        title_text = "Temperature in " + self.location + " on " + date  # add the date
        plot.update_layout(title=title_text, yaxis_title="Temperature (°C)")
        plot_json = plot.to_json()

        return JsonResponse({"plot": plot_json})

    def forecast_plot(self):
        """
        Generate a plot for the forecast.

        Returns:
        - JsonResponse: The plot data in JSON format.

        """
        temperatures = [
            self.forecast_weather[date]["avgtemp"] for date in self.forecast_weather
        ]
        dates = [date for date in self.forecast_weather]
        plot = go.Figure()
        plot.add_trace(
            go.Scatter(
                x=dates, y=temperatures, mode="lines+markers", name="Temperature"
            )
        )
        title_text = "Temperature in upcoming days in " + self.location
        plot.update_layout(
            showlegend=False,
            title=title_text,
            yaxis_title="Temperature (°C)",
            autosize=True,  # Make plot autosize
            margin=dict(l=100, r=100, t=100, b=50),  # Set plot height
            paper_bgcolor="rgb(25, 33, 48)",
            font=dict(
                color="white"  # Change the text color here
            ),
            # Other layout properties...
        )
        plot_json = plot.to_json()

        return JsonResponse({"plot": plot_json})

    def get_forecast_weather(self):
        """
        Get the forecast weather data.

        Returns:
        - JsonResponse: The forecast weather data in JSON format.

        """
        return JsonResponse(self.forecast_weather)

    def get_location_info(self):
        """
        Get the location information.

        Returns:
        - JsonResponse: The location information in JSON format.

        """
        return JsonResponse(self.location_info)
