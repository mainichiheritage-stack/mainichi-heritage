import logging
import uuid

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import generics, status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.throttling import AnonRateThrottle
from config.messages import LogMsg
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer

# ロガーのセットアップ
logger = logging.getLogger(__name__)
User = get_user_model()

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
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            logger.info(
                f"{LogMsg.AUTH_REGISTER_SUCCESS}：email={user.email}",
                extra={
                    "email": user.email,
                    "nickname": getattr(user, 'nickname', '')
                }
            )

            return Response({
                "message": "ユーザー登録が完了しました",
                "email": user.email,
                "nickname": getattr(user, 'nickname', None),
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_201_CREATED)
        
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
        email = request.data.get('email', 'unknown')
        
        if response.status_code == status.HTTP_200_OK:
            logger.info(
                f"{LogMsg.AUTH_LOGIN_SUCCESS}：email={email}",
                extra={"email": email}
            )
        else:
            logger.warning(
                f"{LogMsg.AUTH_LOGIN_FAILED}：status_code={response.status_code}",
                extra={
                    "status_code": response.status_code,
                    "email": email
                }
            )
            
        return response

class PasswordResetThrottle(AnonRateThrottle):
    """
    パスワードリセット専用の制限クラス
    """
    scope = 'password_reset_limit'

class PasswordResetRequestView(APIView):
    """
    パスワード再設定メール送信View
    """
    permission_classes = [AllowAny]
    throttle_classes = [PasswordResetThrottle]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "メールアドレスは必須です"}, status=status.HTTP_400_BAD_REQUEST)

        # emailでユーザーを特定
        user = User.objects.filter(email=email).first()
        
        # ユーザーが存在する場合のみメール送信処理を行う
        if user:
            try:
                # UIDの生成
                uid = urlsafe_base64_encode(force_bytes(user.pk.hex))
                token = default_token_generator.make_token(user)
                
                # フロントエンドのURLを構築
                reset_url = f"{settings.FRONTEND_URL}/password-reset-confirm/{uid}-{token}"
                
                # メール送信
                send_mail(
                    subject="【まいにち世界遺産】パスワード再設定のご案内",
                    message=(
                        f"以下のリンクをクリックしてパスワードを再設定してください。\n\n"
                        f"{reset_url}\n\n"
                        f"※リンクの有効期限は24時間です。\n"
                        f"※このメールに心当たりがない場合は、破棄してください。"
                    ),
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    fail_silently=False,
                )
                logger.info(f"パスワードリセットメール送信成功：email={email}")

            except Exception as e:
                logger.error(f"パスワードリセット処理中のエラー：email={email}, error={str(e)}", exc_info=True)
                return Response({"error": "メール送信中に予期せぬエラーが発生しました"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # ユーザーが見つからなくてもセキュリティ的に常に200 OKを返す
        return Response(
            {"detail": "ご入力いただいたメールアドレスに、リセット手順を記載したメールを送信しました。"}, 
            status=status.HTTP_200_OK
        )

class PasswordResetConfirmView(APIView):
    """
    パスワード再設定実行View
    """
    permission_classes = [AllowAny]

    def post(self, request):
        token_data = request.data.get('token')
        new_password = request.data.get('password')

        if not token_data or not new_password:
            return Response({"error": "必要な情報が不足しています"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # トークンの分割
            if '-' not in token_data:
                return Response({"error": "トークン形式が無効です"}, status=status.HTTP_400_BAD_REQUEST)
            
            uidb64, token = token_data.split('-', 1)

            # UIDのデコードとUUID化
            try:
                decoded_uid = force_str(urlsafe_base64_decode(uidb64))
                user_id = uuid.UUID(decoded_uid) # 文字列をUUIDオブジェクトに厳密変換
            except (ValueError, TypeError, UnicodeDecodeError) as e:
                logger.error(f"UIDデコード失敗: {uidb64} - Error: {str(e)}")
                return Response({"error": "無効なURL形式です"}, status=status.HTTP_400_BAD_REQUEST)

            # ユーザーの取得
            user = User.objects.filter(pk=user_id).first()
            if user is None:
                return Response({"error": "ユーザーが見つかりません"}, status=status.HTTP_400_BAD_REQUEST)

            # トークンの妥当性チェック
            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                logger.info(f"パスワード再設定成功: {user.email}")
                return Response({"detail": "パスワードを正常に更新しました"}, status=status.HTTP_200_OK)
            else:
                logger.warning(f"トークン無効または期限切れ: {user.email}")
                return Response({"error": "このリンクは有効期限切れか、既に使用されています"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"パスワード再設定中に予期せぬエラー: {str(e)}", exc_info=True)
            return Response({"error": "サーバーエラーが発生しました"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserSerializer(serializers.ModelSerializer):
    """
    マイページ表示用のシリアライザー
    """
    class Meta:
        model = User 
        fields = ['id', 'email', 'nickname', 'created_at']

class MyProfileView(APIView):
    """
    ログイン中のユーザー自身の情報を返すView
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)