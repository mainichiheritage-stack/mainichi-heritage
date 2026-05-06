from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="このメールアドレスは既に登録されています。"
            )
        ]
    )
    nickname = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="このニックネームは既に使われています。"
            )
        ]
    )
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        min_length=8,
        error_messages={
            "min_length": "パスワードは8文字以上で入力してください。"
        }
    )
    password_confirm = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('email', 'nickname', 'password', 'password_confirm')

    def validate(self, data):
        # パスワードの一致チェック
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({
                "password_confirm": "パスワードが一致しません。"
            })
        return data

    def create(self, validated_data):
        # 確認用パスワードを除去してユーザー作成
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            password=validated_data['password']
        )
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # ログイン成功時のレスポンスにニックネームを含める
        data['nickname'] = self.user.nickname
        return data