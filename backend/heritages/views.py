import re

from rest_framework import viewsets , filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Heritage , Quiz , Notification
from .serializers import HeritageSerializer , QuizSerializer , NotificationSerializer
from django.utils import timezone

class HeritageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Heritage.objects.all().order_by('-code')
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
        # --- パラメータ取得 ---
        # 難易度
        difficulty = self.request.query_params.get('level', '2')
        if difficulty not in ['1', '2', '3', '4', '5']:
            difficulty = '2'

        # 問題数
        count_param = self.request.query_params.get('count', '5')
        try:
            count = max(1, min(int(count_param), 10))
        except (ValueError, TypeError):
            count = 5

        # カテゴリ
        category = self.request.query_params.get('category', 'all')
        if category not in ['all', 'h', 'g', 'c']:
            category = 'all'

        # コード
        code = self.request.query_params.get('code')

        # --- クエリセット--- 
        # 共通
        queryset = Quiz.objects.filter(difficulty=difficulty)

        # カテゴリ別に「上書き」する
        if category == 'g':
            # 総論：q-g で始まるものだけに固定する
            queryset = queryset.filter(code__startswith='q-g')
        
        elif category == 'c':
            # 時事：q-c で始まり、かつ年指定があれば絞る
            queryset = queryset.filter(code__startswith=f'{code}')

        elif category == 'h':
            # 世界遺産：遺産IDが紐付いているもの
            queryset = queryset.exclude(heritage__isnull=True)
            if code and code != '0':
                match = re.search(r'\d+', code)
                if match:
                    heritage_num = match.group()
                    queryset = queryset.filter(code__startswith=f'q-h-{heritage_num}')
        
        # デバッグ: 実際に発行されるクエリの数を確認
        print(f"DEBUG: category={category}, count={queryset.count()}")

        # ランダムに並び替えて制限
        return queryset.order_by('?')[:count]


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    pagination_class = None
    
    def get_queryset(self):
        return Notification.objects.filter(
            published_at__lte=timezone.now()
        ).order_by('-published_at')[:10]
