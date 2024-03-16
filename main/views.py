from django.shortcuts import render


from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

def home_page(request):
    """
    Renders the home page.

    Paramaters:
        request: The HTTP request object.

    Returns:
        The rendered home.html template.
    """
    return render(request, "home.html")


def stats_page(request):
    """
    Renders the stats page.

    Paramaters:
        request: The HTTP request object.

    Returns:
        The rendered stats.html template with the location and date as context variables.
    """
    location = request.GET.get("location")
    date = request.GET.get("date")

    return render(request, "stats.html", {"location": location, "date": date})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('home')  # Adjust the redirect as necessary
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')  # Redirect to the login page


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  # This saves the User model
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)  # Authenticate the user
            login(request, user)  # Log the user in
            return redirect('home')  # Redirect to a home page
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})


