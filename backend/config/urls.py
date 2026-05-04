from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import MyTokenObtainPairView, RegisterView

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('', health_check),
    path('admin/', admin.site.urls),

    # --- 認証（Auth）API ---
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        
    # --- アプリケーションAPI ---
    path('api/', include('heritages.urls')),
]