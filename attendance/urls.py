from django.urls import path
from .views import *

urlpatterns = [
    path("log/", log_view, name="log"),
    path("log-api/", log_api, name="log-api"),
    path("check-ip-api/", check_ip_api, name="check-ip-api"),
    path("already-logged/", already_logged_view, name="already-logged")
]