from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeritageViewSet , QuizViewSet , NotificationViewSet

router = DefaultRouter()
router.register(r'heritages', HeritageViewSet)
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    # path('api/', include(router.urls)),
    path('', include(router.urls)),
]