from django.shortcuts import render
from django.http import JsonResponse
from .models import attendance

# Create your views here.
def log_view(request):
    return render(request, "attendance/log.html")

def log_api(request):
    if request.method == "POST":
        student_number = request.POST.get("student_number")
        full_name = request.POST.get("full_name")

        if student_number and full_name:
            attendance.objects.create(student_number=student_number, full_name=full_name)
            return JsonResponse({"status": True, "message": f"Attendance for {full_name} logged successfully."})
        else:
            return JsonResponse({"status": False, "message": "Missing student number or full name."})
    return JsonResponse({"status": False, "message": "Invalid request method."})