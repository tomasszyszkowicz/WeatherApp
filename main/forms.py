from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import FavoriteLocations, RecentLocations

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text='Required. Add a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def save(self, commit=True):
        user = super(CustomUserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()

            FavoriteLocations.objects.create(
                user=user,
                location1 = "New York",
                location2 = "Berlin",
                location3 = "Tokyo"
            )

            RecentLocations.objects.create(
                user=user,
                location1 = "‎",
                location2 = "‎",
                location3 = "‎",
                location4 = "‎",
                location5 = "‎",
                location6 = "‎"
            )

        return user
