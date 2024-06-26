from django.urls import path

from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register"),
    path("current/", views.current_page, name="home"),
    path("forecast/", views.forecast_page, name="forecast"),
    path("daily/", views.daily_page, name="daily"),
    path("users/", views.all_users_view, name="users"),
    path('update-favorite-locations/<str:username>/', views.update_favorite_locations, name='update_favorite_locations'),
    path('update-recent-locations/<str:username>/', views.update_recent_locations, name='update_recent_locations'),
    path('favorite-locations/', views.favorite_locations_view, name='favorite-locations'),
    path('recent-locations/', views.recent_locations_view, name='recent-locations'),
]
