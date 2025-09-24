from django.db import models

# Create your models here.
class attendance(models.Model):
    log_id = models.AutoField(primary_key=True)
    student_number = models.CharField(max_length=30)
    full_name = models.CharField(max_length = 60)
    timestamp = models.DateTimeField(auto_now_add=True)

class ip_log(models.Model):
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)