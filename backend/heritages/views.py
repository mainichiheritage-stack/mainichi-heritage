from rest_framework import viewsets , filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Heritage , Quiz , Notification
from .serializers import HeritageSerializer , QuizSerializer , NotificationSerializer
from django.shortcuts import render
from django.utils import timezone

class HeritageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Heritage.objects.all().order_by('-id')
    serializer_class = HeritageSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    # カテゴリー設定（?category=)
    filterset_fields = ['category'] 
    
    # 検索値設定（?search=）
    search_fields = ['name', 'description', 'countries__name']

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuizSerializer
    pagination_class = None

    def get_queryset(self):
        # 難易度のバリデーション
        difficulty = self.request.query_params.get('level', '2')
        if difficulty not in ['1', '2', '3']:
            difficulty = '2'

        # 取得件数のバリデーション
        count_param = self.request.query_params.get('count', '5')
        try:
            count = max(1, min(int(count_param), 10))
        except (ValueError, TypeError):
            count = 5

        # 世界遺産IDのバリデーション
        heritage_id = self.request.query_params.get('heritage_id', '0')

        # クエリの組み立て
        queryset = Quiz.objects.filter(difficulty=difficulty)
        
        if heritage_id and heritage_id != '0':
            try:
                # IDチェック
                queryset = queryset.filter(heritage_id=int(heritage_id))
            except (ValueError, TypeError):
                pass

        # ランダムに取得して件数を制限
        return queryset.order_by('?')[:count]


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    pagination_class = None
    
    def get_queryset(self):
        return Notification.objects.filter(
            published_at__lte=timezone.now()
        ).order_by('-published_at')[:10]
