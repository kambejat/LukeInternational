from rest_framework import serializers
from .models import Facility, District


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'district_code', 'district_name']


class FacilitySerializer(serializers.ModelSerializer):
    owner_id = serializers.ReadOnlyField(source='owner_id.username')
    district_id = DistrictSerializer()

    class Meta:
        model = Facility
        fields = ['facility_code', 'facility_name', 'district_id', 'owner_id', 'is_archived']
