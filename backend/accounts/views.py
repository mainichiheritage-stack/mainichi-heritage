import logging

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from .serializers import MyTokenObtainPairSerializer
from config.messages import LogMsg
logger = logging.getLogger(__name__)
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            logger.info(
                f"{LogMsg.AUTH_REGISTER_SUCCESS}：email={user.email}",
                extra={"email": user.email}
            )

            return Response({
                "message": "ユーザー登録が完了しました",
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        
        logger.warning(
            f"{LogMsg.AUTH_REGISTER_FAILED}：errors={serializer.errors}",
            extra={"errors": serializer.errors}
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == status.HTTP_200_OK:
            # ログイン成功ログ
            email = request.data.get('email', 'unknown')
            logger.debug(
                f"{LogMsg.AUTH_LOGIN_SUCCESS}：email={email}",
                extra={"email": email}
            )
        else:
            # ログイン失敗
            logger.warning(
                f"{LogMsg.AUTH_LOGIN_FAILED}：status_code={response.status_code}",
                extra={"status_code": response.status_code}
            )
            
        return response