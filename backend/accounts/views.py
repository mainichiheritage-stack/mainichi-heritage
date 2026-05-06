import logging

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from config.messages import LogMsg

# ロガーのセットアップ
logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    """
    ユーザー新規登録View
    登録成功時に自動でアクセストークンとリフレッシュトークンを発行する
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # ユーザー保存
            user = serializer.save()

            # 保存されたユーザーに対してトークンを手動生成
            refresh = RefreshToken.for_user(user)
            logger.info(
                f"{LogMsg.AUTH_REGISTER_SUCCESS}：email={user.email}",
                extra={
                    "email": user.email,
                    "nickname": user.nickname
                }
            )

            return Response({
                "message": "ユーザー登録が完了しました",
                "email": user.email,
                "nickname": getattr(user, 'nickname', None),
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)
        
        # バリデーションエラー
        logger.warning(
            f"{LogMsg.AUTH_REGISTER_FAILED}：errors={serializer.errors}",
            extra={"errors": serializer.errors}
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MyTokenObtainPairView(TokenObtainPairView):
    """
    ログイン（トークン取得）View
    """
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_200_OK:
            # ログイン成功
            email = request.data.get('email', 'unknown')
            logger.info(
                f"{LogMsg.AUTH_LOGIN_SUCCESS}：email={email}",
                extra={"email": email}
            )
        else:
            # ログイン失敗
            logger.warning(
                f"{LogMsg.AUTH_LOGIN_FAILED}：status_code={response.status_code}",
                extra={
                    "status_code": response.status_code,
                    "email": request.data.get('email', 'unknown')
                }
            )
            
        return response