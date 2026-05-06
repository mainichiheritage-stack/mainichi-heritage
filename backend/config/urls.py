from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import (
    MyTokenObtainPairView, 
    RegisterView, 
    PasswordResetRequestView, 
    PasswordResetConfirmView
)

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('', health_check),
    path('admin/', admin.site.urls),

    # --- 認証（Auth）API ---
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/auth/password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
        
    # --- アプリケーションAPI ---
    path('api/', include('heritages.urls')),
]