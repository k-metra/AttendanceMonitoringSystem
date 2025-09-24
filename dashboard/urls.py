from django.urls import path
from .views import *

urlpatterns =[
    path("", dashboard_view, name="dashboard"),
    path("login-api/", dashboard_login_api, name="dashboard-login-api"),
    path("login/", dashboard_login_view, name="dashboard-login"),
    path("logout/", dashboard_logout, name="dashboard-logout"),
    path("clear/", dashboard_clear, name="dashboard-clear"),
    path("export/", dashboard_export, name="dashboard-export"),
    path("delete-selected/", dashboard_delete_selected, name="dashboard-delete-selected"),
    path("add-entry-api/", dashboard_add_entry, name="dashboard-add-entry"),
]