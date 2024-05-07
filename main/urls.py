from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.home_page, name="home"),
    path("stats/", views.stats_page, name="stats"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register"),
    path("typescript/", views.typescript_page, name="typescript"),
    path("forecast/", views.forecast_page, name="forecast"),
    path("users/", views.all_users_view, name="users"),
    path('update-favorite-locations/<str:username>/', views.update_favorite_locations, name='update_favorite_locations'),
    path('update-recent-locations/<str:username>/', views.update_recent_locations, name='update_recent_locations'),
    path('favorite-locations/', views.favorite_locations_view, name='favorite-locations'),
    path('recent-locations/', views.recent_locations_view, name='recent-locations'),
]
