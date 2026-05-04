from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # 一覧画面
    list_display = ('email', 'nickname', 'created_at', 'updated_at', 'is_staff')

    # 詳細画面の並び順（メールアドレス順）
    ordering = ('email',)

    # 詳細画面
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('個人情報', {'fields': ('nickname',)}),
        ('権限', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('システム管理', {'fields': ('id', 'last_login', 'date_joined', 'created_at', 'updated_at')}),
    )

    # ユーザー追加画面（管理者用）
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nickname', 'password'), # password_confirmはUserAdminの仕様に合わせるなら調整が必要
        }),
    )

    # 書き換え不可フィールド
    readonly_fields = ('id', 'date_joined', 'last_login', 'created_at', 'updated_at')

admin.site.register(User, CustomUserAdmin)