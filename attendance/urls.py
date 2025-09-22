from django.urls import path
from .views import *

urlpatterns = [
    path("log/", log_view, name="log"),
    path("log-api/", log_api, name="log-api"),
]