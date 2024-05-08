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

        pictures = []

        # Loop through each date in the forecast_weather dictionary
        for date, data in self.forecast_weather.items():
            # Check if "hourly" data is available for the date
            if "hourly" in data:
                # Loop through hourly data
                for hour_data in data["hourly"]:
                    # Check if the hour is "1200"
                    if hour_data["time"] == "1200":
                        # Check if "weather_icons" is available and it's a list with at least one URL
                        if "weather_icons" in hour_data and isinstance(hour_data["weather_icons"], list) and len(hour_data["weather_icons"]) > 0:
                            # Append the first URL in the "weather_icons" list to the pictures list
                            pictures.append(hour_data["weather_icons"][0])
        
        dates = [date for date in self.forecast_weather]
        return JsonResponse({"temperatures": temperatures, "weather_icons": pictures, "dates": dates})

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
        line_color_rgb = (255, 20, 147)
        plot.add_trace(
            go.Scatter(
                x=hours, y=temperatures, mode="lines+markers", name="Temperature", line=dict(color='rgb{}'.format(line_color_rgb), width=4)
            )
        )
        title_text = "Temperature in " + self.location + " on " + date  # add the date
        plot.update_layout(
            showlegend=False,
            yaxis_title="Temperature (°C)",
            autosize=True,  # Make plot autosize
            margin=dict(l=100, r=50, t=20, b=50),  # Set plot height
            plot_bgcolor="rgb(25, 33, 48)",
            paper_bgcolor="rgb(25, 33, 48)",
            font=dict(
                color="white"  # Change the text color here
            ),
            )
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
        line_color_rgb = (255, 20, 147)
        dates = [date for date in self.forecast_weather]
        plot = go.Figure()
        plot.add_trace(
            go.Scatter(
                x=dates, y=temperatures, mode="lines+markers", name="Temperature", line=dict(color='rgb{}'.format(line_color_rgb), width=4)
            )
        )
        plot.update_layout(
            showlegend=False,
            yaxis_title="Temperature (°C)",
            autosize=True,  # Make plot autosize
            margin=dict(l=100, r=50, t=20, b=50),  # Set plot height
            plot_bgcolor="rgb(25, 33, 48)",
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
