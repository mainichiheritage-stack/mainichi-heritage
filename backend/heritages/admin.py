from django.contrib import admin
from .models import Heritage, Criterion, Country, Quiz , Notification

@admin.register(Criterion)
class CriterionAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'short_name', 'description')
    ordering = ('id',)

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'region')
    search_fields = ('name', 'code')
    list_filter = ('region',)

@admin.register(Heritage)
class HeritageAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'name', 
        'category',
        'level',
        'registered_year', 
        'is_danger'
    )
    filter_horizontal = ('countries', 'criteria')
    list_filter = ('category', 'level', 'is_danger', 'registered_year')
    search_fields = ('name', 'description', 'countries__name', 'criteria__number')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    # list_display = ('id', 'heritage', 'difficulty', 'question')
    # list_filter = ('difficulty', 'heritage')
    # search_fields = ('question', 'heritage__name')
    list_display = ('id',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_at')
    list_filter = ('category',)
    ordering = ('-published_at',)