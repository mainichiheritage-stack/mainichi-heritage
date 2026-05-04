from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'nickname', 'password', 'password_confirm')

    def validate(self, data):
        # パスワードの一致チェック
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "パスワードが一致しません"})
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
        data['nickname'] = self.user.nickname
        return data