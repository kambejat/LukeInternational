from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FacilityViewSet, FacilityDetailView, FacilityArchiveView, DistrictView
router = DefaultRouter()
router.register(r'districts', DistrictView)
router.register(r'facilities', FacilityViewSet, basename='facility')

urlpatterns = [
    # path('facilities/', FacilityListCreateView.as_view(), name='facility-list-create'),
    path('facilities/<int:pk>/', FacilityDetailView.as_view(), name='facility-detail'),
    path('facilities/<int:pk>/archive/', FacilityArchiveView.as_view(), name='facility-archive'),
    path('', include(router.urls)),
]
