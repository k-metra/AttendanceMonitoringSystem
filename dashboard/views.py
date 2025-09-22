from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from attendance.models import attendance

# temporarily comment as we are in testing
# TODO: DO NOT FORGET TO UN-COMMENT THIS DECORATOR KURT !!!!!
# @login_required
def dashboard_view(request):
    data = attendance.objects.all()
    return render(request, "dashboard/dashboard.html", {"data_list": data})
