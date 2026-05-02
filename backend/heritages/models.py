from django.db import models
from django.utils import timezone

LEVEL_CHOICES = [
    (1, '4級'),
    (2, '3級'),
    (3, '2級'),
    (4, '準1級'),
    (5, '1級'),
    (6, 'マイスター')
]

class Country(models.Model):

    REGION_CHOICES = [
        (1, 'アジア・オセアニア'),
        (2, 'ヨーロッパ・北米'),
        (3, 'ラテンアメリカ・カリブ'),
        (4, 'アフリカ'),
        (5, 'アラブ諸国'),
    ]

    code = models.CharField(max_length=10, unique=True, verbose_name="国コード")
    name = models.CharField(max_length=100, verbose_name="国名")
    region = models.IntegerField(
        choices=REGION_CHOICES, 
        default=1, 
        verbose_name="地域区分"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "国マスタ"
        verbose_name_plural = "国マスタ"

class Criterion(models.Model):
    code = models.CharField(
        max_length=10, 
        unique=True,
        verbose_name="登録基準コード"
    )
    number = models.CharField(max_length=10, unique=True, verbose_name="登録基準番号")
    short_name = models.CharField(max_length=50, verbose_name="要約")
    description = models.TextField(verbose_name="基準の内容")

    def __str__(self):
        return f"基準({self.number})"

    class Meta:
        verbose_name = "登録基準"
        verbose_name_plural = "登録基準マスタ"

class Heritage(models.Model):

    CATEGORY_CHOICES = [
        (1, '文化遺産'),
        (2, '自然遺産'),
        (3, '複合遺産'),
    ]

    # 世界遺産情報
    code = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="コード"
    )
    name = models.CharField(max_length=255, verbose_name="世界遺産名")
    category = models.IntegerField(choices=CATEGORY_CHOICES, verbose_name="カテゴリー")
    catchphrase = models.CharField(max_length=255,blank=True, null=True,verbose_name="キャッチフレーズ")
    description = models.TextField(blank=True, null=True, verbose_name="説明")
    registered_year = models.IntegerField(verbose_name="登録年")
    countries = models.ManyToManyField(Country, related_name="heritages", verbose_name="所在国")
    level = models.IntegerField(choices=LEVEL_CHOICES, default=2, verbose_name="対象級")
    criteria = models.ManyToManyField(Criterion, related_name="heritages", verbose_name="登録基準")

    # ジャンル
    is_danger = models.BooleanField(default=False, verbose_name="危機遺産フラグ")
    danger_registered_year = models.IntegerField(blank=True, null=True, verbose_name="危機遺産登録年")
    is_negative_heritage = models.BooleanField(default=False, verbose_name="負の遺産フラグ")
    is_cultural_landscape = models.BooleanField(default=False, verbose_name="文化的景観フラグ",)

    # 画像関連
    image_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="画像URL")
    source_name = models.CharField(max_length=100, blank=True, null=True, verbose_name="出典元")
    source_url = models.URLField(blank=True, null=True, verbose_name="出典元URL")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "世界遺産"
        verbose_name_plural = "世界遺産一覧"

class Quiz(models.Model):
    heritage = models.ForeignKey(
        Heritage, 
        on_delete=models.CASCADE, 
        related_name='quizzes',
        verbose_name="対象の遺産",
        blank=True,
        null=True
    )
    code = models.CharField(max_length=20, unique=True, verbose_name="クイズコード")
    question = models.TextField(verbose_name="問題文")
    choice_correct = models.CharField(max_length=255, verbose_name="正解")
    choice_distractor1 = models.CharField(max_length=255, verbose_name="不正解1")
    choice_distractor2 = models.CharField(max_length=255, verbose_name="不正解2")
    choice_distractor3 = models.CharField(max_length=255, verbose_name="不正解3")
    explanation = models.TextField(blank=True, null=True, verbose_name="解説")
    tips = models.TextField(blank=True, null=True, verbose_name="ヒント")
    difficulty = models.IntegerField(
        choices=LEVEL_CHOICES,
        default=1,
        verbose_name="難易度"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    def __str__(self):
        target_name = self.heritage.name if self.heritage else self.code
        return f"[{self.get_difficulty_display()}] {target_name}"

    class Meta:
        verbose_name = "クイズ"
        verbose_name_plural = "クイズ一覧"

class Notification(models.Model):

    CATEGORY_URGENT = 1
    CATEGORY_UPDATE = 2
    CATEGORY_HERITAGE = 3
    CATEGORY_QUIZ = 4
    CATEGORY_EXAM = 5
    CATEGORY_OTHER = 9

    CATEGORY_CHOICES = [
        (CATEGORY_URGENT, '重要'),
        (CATEGORY_UPDATE, 'アップデート'),
        (CATEGORY_HERITAGE, '世界遺産追加'),
        (CATEGORY_QUIZ, 'クイズ追加'),
        (CATEGORY_EXAM, '検定情報'),
        (CATEGORY_OTHER, 'その他'),
    ]

    category = models.IntegerField(
        choices=CATEGORY_CHOICES,
        default=9,
        verbose_name="カテゴリ"
    )
    title = models.CharField(max_length=200, verbose_name="タイトル")
    content = models.TextField(verbose_name="本文")
    published_at = models.DateTimeField(default=timezone.now, verbose_name="公開日時")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        verbose_name = "お知らせ"
        verbose_name_plural = "お知らせ一覧"
        ordering = ['-published_at']

    def __str__(self):
        return self.title