from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home_page, name="home"),
    path("stats/", views.stats_page, name="stats"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register"),
    path("typescript/", views.typescript_page, name="typescript"),
]
