from django.shortcuts import render


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
