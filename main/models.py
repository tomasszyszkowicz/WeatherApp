
from django.db import models
from django.contrib.auth.models import User

class FavoriteLocations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location1 = models.CharField(max_length=100)
    location2 = models.CharField(max_length=100)
    location3 = models.CharField(max_length=100)

    def __str__(self):
        return f"Favorite locations for {self.user.username}"


class RecentLocations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location1 = models.CharField(max_length=100)
    location2 = models.CharField(max_length=100)
    location3 = models.CharField(max_length=100)
    location4 = models.CharField(max_length=100)
    location5 = models.CharField(max_length=100)
    location6 = models.CharField(max_length=100)

    def __str__(self):
        return f"Recent locations for {self.user.username}"