from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import requires_csrf_token
from attendance.models import attendance
from datetime import datetime

from django.contrib.auth import authenticate, login, logout
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

def dashboard_logout(request):
    logout(request)

    return redirect(settings.LOGIN_URL)

@requires_csrf_token
def dashboard_clear(request):
    if request.method == "POST":
        attendance.objects.all().delete()
        return JsonResponse({"success": True, "message": "All attendance records have been cleared."})

def dashboard_export(request):
    import csv
    from django.http import HttpResponse

    response = HttpResponse(content_type='text/csv')
    current_date = datetime.now().strftime("%d-%m-%Y")

    filename = f"attendance_{current_date}.csv"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    writer = csv.writer(response)

    writer.writerow(['Log ID', 'Student Number', 'Full Name', 'Timestamp'])
    records = attendance.objects.all().order_by('timestamp')

    for record in records:
        writer.writerow([
            record.log_id, 
            record.student_number, 
            record.full_name, 
            record.timestamp])
    
    return response