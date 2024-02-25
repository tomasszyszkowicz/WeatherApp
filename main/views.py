from django.shortcuts import render

# Create your views here.


def home_page(request):
    return render(request, "home.html")


def stats_page(request):

    location = request.GET.get("location")
    date = request.GET.get("date")

    return render(request, "stats.html", {"location": location, "date": date})
