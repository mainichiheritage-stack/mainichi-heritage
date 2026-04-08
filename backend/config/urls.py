from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def health_check(request):
    return HttpResponse("OK")

urlpatterns = [
    path('', health_check),  # ルートにアクセスしたら OK を返す
    path('admin/', admin.site.urls),
    path('api/', include('heritages.urls')),
]