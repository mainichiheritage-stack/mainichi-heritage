from rest_framework import serializers
from .models import Heritage , Quiz , Notification , Criterion

class CriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criterion
        fields = ['number', 'short_name', 'description']

class HeritageSerializer(serializers.ModelSerializer):
    
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
    heritage_name = serializers.ReadOnlyField(source='heritage.name')

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

class NotificationSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'title', 'content', 'category', 'category_display', 'published_at']