from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse

# Create your views here.

def get_value(request):
    return JsonResponse(
        {
            "value": 84,
        }
    )
    
