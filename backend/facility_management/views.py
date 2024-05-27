from django.db.models import Max
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Facility, District
from .serializer import FacilitySerializer, DistrictSerializer
from django_filters.rest_framework import DjangoFilterBackend
import requests


class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['facility_code', 'facility_name', 'district__district_name', 'is_archived']

    def create(self, request, *args, **kwargs):
        # Fetch the last facility's ID
        last_facility_id = Facility.objects.aggregate(Max('id'))['id__max'] or 0

        # Generate facility code based on the last facility's ID or set default if no facility exists
        if last_facility_id:
            facility_code = f'FC{last_facility_id + 1}'
        else:
            facility_code = 'FC1'  # Default facility code if no facility exists

        # Extract facility data from request
        facility_data = {
            'facility_code': facility_code,
            'facility_name': request.data.get('facility_name'),
            'district_id': request.data.get('district_id'),
            'owner_id': request.data.get('owner_id')  # Get owner ID from frontend
        }
        print(facility_data)

        # Check if the facility exists in the master health facility registry
        if self.check_facility_exists(facility_data['facility_code']):
            return Response({'error': 'Facility already exists in the master health facility registry.'}, status=status.HTTP_400_BAD_REQUEST)
        # Create the facility
        serializer = self.get_serializer(data=facility_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def check_facility_exists(self, facility_code):
        # Check if a facility with the given facility code already exists in the database
        return Facility.objects.filter(facility_code=facility_code).exists()


class FacilityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    # permission_classes = [IsAuthenticated]


class FacilityArchiveView(generics.UpdateAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    # permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        facility = self.get_object()
        facility.is_archived = True
        facility.save()
        return Response({'status': 'Facility archived successfully'})


class DistrictView(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

    def create(self, request, *args, **kwargs):
        # Check if the request data is a list
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)