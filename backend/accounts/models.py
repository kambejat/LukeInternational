from django.db import models
from django.contrib.auth.models import AbstractUser

ROLES = [('Admin', 'admin'), ('', '')]


class User(AbstractUser):
    role = models.CharField(max_length=10, choices=ROLES, default='user')

    # class Meta:
    #     verbose_name = 'user'
    #     verbose_name_plural = 'users'
    #     ordering = ['-id']
    #     db_table = 'users'
