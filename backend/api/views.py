from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers import AccountSerializer


class RegisterAccount(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        account = AccountSerializer(data=request.data)
        if account.is_valid():
            saved = account.save()
            print('Saved', account)
            if saved:
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return

