# Generated by Django 5.0.6 on 2024-05-27 11:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facility_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facility',
            name='district_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='facilities_districts', to='facility_management.district'),
        ),
    ]