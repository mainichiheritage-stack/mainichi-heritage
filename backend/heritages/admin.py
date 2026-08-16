from django.contrib import admin
from .models import Heritage, HeritageSection, Criterion, Country, Quiz, Notification

@admin.register(Criterion)
class CriterionAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'number', 'short_name', 'description')
    ordering = ('id',)

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'region')
    search_fields = ('name', 'code')
    list_filter = ('region',)

class HeritageSectionInline(admin.StackedInline):
    model = HeritageSection
    extra = 1
    ordering = ('sort_order',)
    fields = ('sort_order', 'section_type', 'target_level', 'title', 'content', 'image_code', 'source_name', 'source_url')

@admin.register(Heritage)
class HeritageAdmin(admin.ModelAdmin):
    list_display = (
        'code', 
        'name', 
        'category',
        'level',
        'registered_year', 
        'is_danger',
        'danger_registered_year',
        'is_negative_heritage',
        'is_cultural_landscape',
    )
    filter_horizontal = ('countries', 'criteria')
    list_filter = ('category', 'level', 'is_danger', 'registered_year')
    search_fields = ('code', 'name', 'catchphrase', 'countries__name', 'criteria__number')
    
    # インライン設定を登録（世界遺産画面の下部にセクションを出す）
    inlines = [HeritageSectionInline]

@admin.register(HeritageSection)
class HeritageSectionAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'heritage_code', 
        'sort_order', 
        'section_type', 
        'target_level', 
        'title'
    )
    list_filter = ('section_type', 'target_level', 'heritage_code')
    search_fields = ('heritage_code__code', 'heritage_code__name', 'title', 'content')
    ordering = ('heritage_code', 'sort_order')

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'heritage', 'difficulty', 'question')
    list_filter = ('difficulty', 'heritage')
    search_fields = ('code', 'question', 'heritage__name')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published_at')
    list_filter = ('category',)
    ordering = ('-published_at',)