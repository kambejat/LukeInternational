from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


class District(models.Model):
    district_code = models.CharField(max_length=255, unique=True)
    district_name = models.CharField(max_length=255)

    def __str__(self):
        return self.district_name

    class Meta:
        db_table = 'District'


class Facility(models.Model):
    facility_code = models.CharField(max_length=255, unique=True)
    facility_name = models.CharField(max_length=255)
    district_id = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True, related_name='facilities_districts')
    owner_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='facilities')
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.facility_name

    class Meta:
        db_table = 'Facility'
