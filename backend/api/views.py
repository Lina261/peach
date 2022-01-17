from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from api.serializers import AccountSerializer


class RegisterAccount(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        account = AccountSerializer(data=request.data)
        if account.is_valid():
            saved_account = account.save()
            if saved_account:
                profile = Profile(account=saved_account, name=None, surname=None, caption=None, photo=None)
                profile.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return


class HomePage(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        account = request.user.username
        return Response({'user': account})
