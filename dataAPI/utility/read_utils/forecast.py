from ..weatherstack.weatherstack_api_calls import ForecastAPICall
from django.http import HttpRequest, HttpResponse, JsonResponse
import plotly.graph_objs as go

class ForecastWeather:
    
    def __init__(self, request):

        self.forecast_weather = ForecastAPICall(request).get_forecast_weather()
        self.location = request.GET.get("location")

    def get_forecast_data_to_display(self):

        temperatures = [
            self.forecast_weather[date]["avgtemp"] for date in self.forecast_weather
        ]
        dates = [date for date in self.forecast_weather]

        return JsonResponse({'temperatures': temperatures, 'dates': dates})
    
    def get_specific_forecast_day(self, date):

        specific_day_forecast = self.forecast_weather[date]
        return JsonResponse(specific_day_forecast)

    def forecast_plot(self):

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
        plot.update_layout(title=title_text, yaxis_title="Temperature (°C)")

        plot_json = plot.to_json()

        return JsonResponse({"plot": plot_json})   

    def get_forecast_weather(self):
        return JsonResponse(self.forecast_weather) 
    


