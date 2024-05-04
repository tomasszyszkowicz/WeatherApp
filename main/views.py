from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


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


def typescript_page(request):
    """
    Renders the TypeScript page.

    Parameters:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The rendered typescript.html template.
    """
    return render(request, "typescript.html")
