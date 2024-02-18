from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home_page, name="home"),
    path("stats/", views.stats_page, name="stats"),

]
