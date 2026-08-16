from rest_framework import serializers
from .models import Heritage, Quiz, Notification, Criterion, QuizAnswerHistory, HeritageSection

class CriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criterion
        fields = ['number', 'short_name', 'description']

class HeritageSectionSerializer(serializers.ModelSerializer):
    section_type_display = serializers.CharField(source='get_section_type_display', read_only=True)
    target_level_display = serializers.CharField(source='get_target_level_display', read_only=True)

    class Meta:
        model = HeritageSection
        fields = [
            'id', 
            'sort_order', 
            'section_type', 
            'section_type_display', 
            'target_level', 
            'target_level_display', 
            'title', 
            'content', 
            'image_code',
            'source_name',
            'source_url'
        ]

class HeritageSerializer(serializers.ModelSerializer):
    sections = HeritageSectionSerializer(many=True, read_only=True)
    criteria = CriterionSerializer(many=True, read_only=True)
    countries = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    
    class Meta:
        model = Heritage
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    heritage_name = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = [
            'id',
            'code',
            'heritage_name',
            'question', 
            'tips',
            'choice_correct',
            'choice_distractor1', 
            'choice_distractor2',
            'choice_distractor3', 
            'explanation',
            'difficulty'
        ]

    def get_heritage_name(self, obj):
        # heritageが紐付いている時だけ名前を返し、なければNoneを返す
        return obj.heritage.name if obj.heritage else None

class NotificationSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'title', 'content', 'category', 'category_display', 'published_at']

class QuizAnswerHistorySerializer(serializers.ModelSerializer):
    quiz_code = serializers.SlugRelatedField(
        slug_field='code',
        queryset=Quiz.objects.all(),
        source='quiz'
    )
    is_correct = serializers.BooleanField(source='is_latest_correct')

    class Meta:
        model = QuizAnswerHistory
        fields = ['quiz_code', 'is_correct']