from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
from .models import attendance
from .models import ip_log

# METHODS
def check_ip(ip):
    # how many hours before a user may be able to submit again
    DURATION_THRESHOLD = 12

    try:
        logged_ip = ip_log.objects.get(ip_address=ip)

        elapsed = (timezone.now() - logged_ip.timestamp)
        threshold_in_seconds = DURATION_THRESHOLD * 60 * 60

        if (elapsed.total_seconds() <= threshold_in_seconds):
            return (False, f"Unsuccessful. Elapsed: {elapsed.total_seconds()}.")
        else:
            return (True, "Successful.")
    except ip_log.DoesNotExist:
        return(True, "No logged IP found.")
    except Exception as ex:
        return(True, f"Something went wrong checking the IP: {ex.__str__}")


# Create your views here.
def log_view(request):
    return render(request, "attendance/log.html")

def log_api(request):
    if request.method == "POST":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = None

        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        student_number = request.POST.get("student_number")
        full_name = request.POST.get("full_name")

        if student_number and full_name:
            attendance.objects.create(student_number=student_number, full_name=full_name)
            ip_log.objects.update_or_create(ip_address=ip)
            return JsonResponse({"status": True, "message": f"Attendance for {full_name} logged successfully."})
        else:
            return JsonResponse({"status": False, "message": "Missing student number or full name."})
    return JsonResponse({"status": False, "message": "Invalid request method."})

def check_ip_api(request):
    if request.method == "GET":
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = None

        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else: ip = request.META.get('REMOTE_ADDR')

        result = check_ip(ip)

        if result[0] == True:
            if (len(result) > 1):
                message = result[1]
            else: message = "Success."

            return JsonResponse({"status": True, "message": message})
        else:
            return JsonResponse({"status": False, "message": result[1] if len(result) > 1 else "Failed."})
    else:
        return JsonResponse({"status": True, "message":"Invalid request method."})

def already_logged_view(request):
    return render(request, "attendance/alreadyLogged.html")