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


class ProfileSerializer(serializers.ModelSerializer):
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


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'videofile')


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


class PeoplePageSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Profile
        fields = ('account', 'caption', 'photo')
