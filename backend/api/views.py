from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from api.serializers import AccountSerializer, ProfileSerializer, HeaderInfoSerializer


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
        return Response(status=status.HTTP_403_FORBIDDEN)


class HomePage(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        account = request.user.username
        photo = request.user.profile.photo
        serializer = HeaderInfoSerializer({'user': account, 'photo': photo})
        return Response(serializer.data)  # will be expanded


class ProfileInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        profile_to_update = request.user.profile
        serializer = ProfileSerializer(profile_to_update, request.data.get('userData'))
        if serializer.is_valid():
            saved = serializer.save()
            if saved:
                return Response(serializer.data)
        print(serializer.errors)
        return Response(status=status.HTTP_403_FORBIDDEN)
