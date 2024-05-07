from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import FavoriteLocations, RecentLocations
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import json


@login_required
def home_page(request):
    """
    Renders the home page.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered home.html template.
    """
    return render(request, "home.html")


@login_required
def stats_page(request):
    """
    Renders the stats page.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered stats.html template with the location and date as context variables.
    """
    location = request.GET.get("location")
    date = request.GET.get("date")

    return render(request, "stats.html", {"location": location, "date": date})


def login_view(request):
    """
    Handles the login view.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered login.html template with the login form.
    """
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("home")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})


def logout_view(request):
    """
    Handles the logout view.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: Redirects to the login page.
    """
    logout(request)
    return redirect("login")


def register_view(request):
    """
    Handles the register view.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered register.html template with the registration form.
    """
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get("username")
            raw_password = form.cleaned_data.get("password1")
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect("home")  # Redirect to a home page
    else:
        form = CustomUserCreationForm()
    return render(request, "register.html", {"form": form})


@login_required
def current_page(request):
    """
    Renders the current page.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered current.html template.
    """
    return render(request, "current.html")


def forecast_page(request):
    """
    Renders the forecast page.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered forecast.html template.
    """
    return render(request, "forecast.html")


def all_users_view(request):
    # Get all users from the database
    users = User.objects.all()

    # Serialize the user data to JSON format
    users_data = serialize('json', users)

    # Return the serialized data as an HTTP response
    return JsonResponse(users_data, safe=False)


def favorite_locations_view(request):
    # Extract the username from the query parameters
    username = request.GET.get('username')

    if not username:
        return JsonResponse({'error': 'Username query parameter is required'}, status=400)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': f'User with username {username} does not exist'}, status=404)

    try:
        favorite_locations = FavoriteLocations.objects.get(user=user)
    except FavoriteLocations.DoesNotExist:
        return JsonResponse({'error': f'Favorite locations not found for user {username}'}, status=404)

    favorite_locations = {
        'location1': favorite_locations.location1,
        'location2': favorite_locations.location2,
        'location3': favorite_locations.location3
    }
    return JsonResponse(favorite_locations, safe=False)


@csrf_exempt
def update_favorite_locations(request, username):
    if request.method == 'PATCH':
        # Get the user object based on the username
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': f'User with username {username} does not exist'}, status=404)

        # Get the favorite locations object for the user
        favorite_locations, created = FavoriteLocations.objects.get_or_create(user=user)

        # Update the favorite locations based on the PATCH request data
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        favorite_locations.location1 = data.get('location1', favorite_locations.location1)
        favorite_locations.location2 = data.get('location2', favorite_locations.location2)
        favorite_locations.location3 = data.get('location3', favorite_locations.location3)
        favorite_locations.save()

        return JsonResponse({'message': f'Favorite locations updated successfully for user {username}'}, status=200)
    else:
        return JsonResponse({'error': 'Only PATCH requests are allowed'}, status=405)


def recent_locations_view(request):
    # Extract the username from the query parameters
    username = request.GET.get('username')

    if not username:
        return JsonResponse({'error': 'Username query parameter is required'}, status=400)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': f'User with username {username} does not exist'}, status=404)

    try:
        recent_locations = RecentLocations.objects.get(user=user)
    except RecentLocations.DoesNotExist:
        return JsonResponse({'error': f'Recent locations not found for user {username}'}, status=404)

    recent_locations = {
        'location1': recent_locations.location1,
        'location2': recent_locations.location2,
        'location3': recent_locations.location3,
        'location4': recent_locations.location4,
        'location5': recent_locations.location5,
        'location6': recent_locations.location6
    }
    return JsonResponse(recent_locations, safe=False)


def update_recent_locations(request, username):
    if request.method == 'PATCH':
        # Get the user object based on the username
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': f'User with username {username} does not exist'}, status=404)

        # Get the recent locations object for the user
        recent_locations, created = RecentLocations.objects.get_or_create(user=user)

        # Update the recent locations based on the PATCH request data
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        recent_locations.location6 = (recent_locations.location5)
        recent_locations.location5 = (recent_locations.location4)
        recent_locations.location4 = (recent_locations.location3)
        recent_locations.location3 = (recent_locations.location2)
        recent_locations.location2 = (recent_locations.location1)
        recent_locations.location1 = data.get('location')
        recent_locations.save()

        return JsonResponse({'message': f'Recent locations updated successfully for user {username}'}, status=200)
    else:
        return JsonResponse({'error': 'Only PATCH requests are allowed'}, status=405)
