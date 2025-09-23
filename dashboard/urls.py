from django.urls import path
from .views import *

urlpatterns =[
    path("", dashboard_view, name="dashboard"),
    path("login-api/", dashboard_login_api, name="dashboard-login-api"),
    path("login/", dashboard_login_view, name="dashboard-login"),
    path("logout/", dashboard_logout, name="dashboard-logout"),
    path("clear/", dashboard_clear, name="dashboard-clear"),
]