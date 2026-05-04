from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
import uuid

# ユーザ作成のためのカスタムマネージャー
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('メールアドレスは必須です')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# ユーザーモデル
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    email = models.EmailField(
        unique=True, 
        blank=False, 
        null=False, 
        verbose_name="メールアドレス"
    )
    nickname = models.CharField(
        max_length=30, 
        unique=True, 
        blank=False, 
        null=False, 
        verbose_name="ニックネーム"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日")

    objects = UserManager()

    USERNAME_FIELD = 'email' # ログイン時に使用するフィールド
    REQUIRED_FIELDS = ['nickname']

    class Meta:
        verbose_name = "ユーザー"
        verbose_name_plural = "ユーザー一覧"

    def __str__(self):
        return f"{self.nickname} ({self.email})"