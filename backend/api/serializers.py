from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework import serializers
from .models import Account, Profile, Video


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account = Account(
            email=validated_data['email'],
            username=validated_data['username']
        )
        account.set_password(validated_data['password'])
        account.save()
        return account


class AccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'username', 'id')
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()],
            },
            'email': {'read_only': True}
        }

    def update(self, instance, validated_data):
        instance.username = validated_data.get('name', instance.username)
        instance.save()
        return instance


class ProfileSettingsSerializer(serializers.ModelSerializer):
    account = AccountInfoSerializer()

    class Meta:
        model = Profile
        fields = ('name', 'surname', 'caption', 'account', 'photo', 'followers', 'follows')
        extra_kwargs = {'photo': {'read_only': True}}

    def update(self, instance, validated_data):
        account_data = validated_data.pop('account')
        account = instance.account
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.caption = validated_data.get('caption', instance.caption)
        instance.save()
        account.username = account_data.get('username', account.username)
        account.save()
        return instance


class HeaderInfoSerializer(serializers.Serializer):
    photo = serializers.FileField()
    user = serializers.CharField()


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['photo']


class VideoSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField('get_owner')
    photo = serializers.SerializerMethodField('get_photo')

    def get_owner(self, video):
        return video.owner.account.username

    def get_photo(self, video):
        serializer = PhotoSerializer(video.owner)
        return serializer.data

    class Meta:
        model = Video
        fields = ['id', 'owner', 'title', 'videofile', 'photo', 'liked']


class PageSerializer(serializers.ModelSerializer):
    account = AccountInfoSerializer()
    followers = serializers.SerializerMethodField('get_followers')
    follows = serializers.SerializerMethodField('get_follows')
    video = VideoSerializer(many=True)

    def get_followers(self, profile):
        return profile.followers.count()

    def get_follows(self, profile):
        return profile.follows.count()

    class Meta:
        model = Profile
        fields = ('name', 'surname', 'caption', 'account', 'photo', 'followers', 'follows', 'video')
        extra_kwargs = {'photo': {'read_only': True}}


class ProfileSerializer(serializers.ModelSerializer):
    account = AccountSerializer()
    subscribe_status = serializers.SerializerMethodField('get_status')

    def get_status(self, profile):
        user = self.context.get('user')
        if user == profile:
            return 'OWNER'
        return profile in self.context.get('follows')

    class Meta:
        model = Profile
        fields = ('account', 'caption', 'photo', 'subscribe_status')
