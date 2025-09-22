from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from attendance.models import attendance

from django.contrib.auth import authenticate, login
from django.http import JsonResponse

# temporarily comment as we are in testing
# TODO: DO NOT FORGET TO UN-COMMENT THIS DECORATOR KURT !!!!!
@login_required
def dashboard_view(request):
    data = attendance.objects.all()
    return render(request, "dashboard/dashboard.html", {"data_list": data})

def dashboard_login_api(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"status": True, "message": "Login successful."})
        else:
            return JsonResponse({"status": False, "message": "Invalid username or password."})
    return JsonResponse({"status": False, "message": "Invalid request method."})

def dashboard_login_view(request):
    return render(request, "dashboard/login.html")
