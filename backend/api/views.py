from django.core.files.storage import FileSystemStorage
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile, Video
from api.serializers import AccountSerializer, ProfileSerializer, HeaderInfoSerializer, PageSerializer, \
    PeopleSerializer, FollowersSerializer, VideoSerializer
from rest_framework.pagination import LimitOffsetPagination


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
        print(account.errors)
        return Response(status=status.HTTP_403_FORBIDDEN, data=account.errors)


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


class ProfilePage(APIView):

    def get(self, request):
        profile = request.user.profile
        serializer = PageSerializer(profile)
        return Response(serializer.data)


class PeoplePage(APIView):

    def get(self, request):
        profile = request.user.profile
        follows = profile.follows.all()
        people = Profile.objects.exclude(account__username=profile.account.username).exclude(id__in=follows)
        serializer = PeopleSerializer(people, many=True)
        return Response(serializer.data)


class Subscribe(APIView):

    def post(self, request):
        profile = request.user.profile
        to_subscribe = request.data.get('to_subscribe')
        follow = Profile.objects.get(account__username=to_subscribe)
        try:
            profile.follows.add(follow)
            follow.followers.add(profile)
        except Exception:
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_200_OK)


class Unsubscribe(APIView):

    def post(self, request):
        profile = request.user.profile
        unsubscribe = request.data.get('unsubscribe')
        follow = Profile.objects.get(account__username=unsubscribe)
        try:
            profile.follows.remove(follow)
            follow.followers.remove(profile)
        except Exception:
            return Response(status.HTTP_400_BAD_REQUEST)
        return Response(status.HTTP_200_OK)


class Follows(APIView):

    def get(self, request):
        people = request.user.profile.follows
        serializer = PeopleSerializer(people, many=True)
        return Response(serializer.data)


class Followers(APIView):

    def get(self, request):
        people = request.user.profile.followers
        follows = request.user.profile.follows.all()
        serializer = FollowersSerializer(people, context={'follows': follows}, many=True)
        return Response(serializer.data)


class VideoView(ListAPIView):
    pagination_class = LimitOffsetPagination
    serializer_class = VideoSerializer

    def get_queryset(self):
        profile = self.request.user.profile
        follows = profile.follows.all()
        return Video.objects.exclude(owner=profile).filter(owner__in=follows)


class ProfileDetail(APIView):
    def get(self, request, id):
        profile = Profile.objects.get(account__id=id)
        serializer = PageSerializer(profile)
        return Response(serializer.data)


class FindAccount(APIView):

    def post(self, request):
        account = request.data.get('account')
        follows = request.user.profile.follows.all()
        result = Profile.objects.exclude(account__username=request.user.profile).exclude(id__in=follows) \
            .filter(account__username__contains=account)
        if result:
            serializer = PeopleSerializer(result, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class VideoUpload(APIView):

    def post(self, request):
        try:
            video = request.FILES['video']
            title = request.data.get('title')
            fs = FileSystemStorage(location='media/video/')
            video_name = fs.save(video.name, video)
            uploaded_video_url = fs.url(video_name)
            video_url = f"video/{uploaded_video_url.split('/')[2]}"
            Video.objects.create(videofile=video_url, title=title, owner=request.user.profile)
            return Response(status=status.HTTP_201_CREATED)
        except Exception:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class PhotoUpload(APIView):

    def post(self, request):
        try:
            photo = request.FILES['photo']
            fs = FileSystemStorage(location='media/photo/')
            photo_name = fs.save(photo.name, photo)
            uploaded_photo_url = fs.url(photo_name)
            photo_url = f"photo/{uploaded_photo_url.split('/')[2]}"
            profile = request.user.profile
            profile.photo = photo_url
            profile.save()
            return Response(status=status.HTTP_201_CREATED)
        except Exception:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
