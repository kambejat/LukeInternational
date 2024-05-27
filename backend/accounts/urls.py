from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name="token_obtain"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
