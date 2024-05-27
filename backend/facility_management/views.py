from django.db.models import Max
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Facility, District
from .serializer import FacilitySerializer, DistrictSerializer
from django_filters.rest_framework import DjangoFilterBackend
import requests


class FacilityViewSet(viewsets.ViewSet):
    def create(self, request):
        facility_data = request.data.copy()  # Copy request data to avoid modifying original data
        facility_data['facility_code'] = self.generate_facility_code()  # Generate facility code
        serializer = FacilitySerializer(data=facility_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def generate_facility_code(self):
        last_facility = Facility.objects.last()  # Get the last facility
        if last_facility:
            last_id = int(last_facility.facility_code[2:])  # Extract numeric part of facility code
            new_id = last_id + 1
            return f'FC{new_id:03}'  # Format new facility code with leading zeros
        else:
            return 'FC001'

    def list(self, request):
        queryset = Facility.objects.all()
        serializer = FacilitySerializer(queryset, many=True)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        try:
            facility = Facility.objects.get(pk=pk)
        except Facility.DoesNotExist:
            return Response({'error': 'Facility not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = FacilitySerializer(facility, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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