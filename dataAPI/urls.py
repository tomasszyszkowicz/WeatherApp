from django.urls import path

from . import views

urlpatterns = [
    path("value/", views.get_value, name="value"),
]