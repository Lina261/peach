from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class AccountManager(BaseUserManager):
    def create_user(self, username, email, password, is_superuser=False):
        """ Create user with email """
        if username is None:
            raise TypeError('User must have a username.')

        if email is None:
            raise TypeError('User must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email), is_superuser=is_superuser)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        """ Create superuser"""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=255)
    email = models.EmailField(unique=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AccountManager()

    def __str__(self):
        return self.email


class Video(models.Model):
    owner = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='video')
    title = models.CharField(max_length=255)
    videofile = models.FileField(upload_to='video/')  # temporary solution
    liked = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Profile(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    surname = models.CharField(max_length=255, blank=True, null=True)
    account = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='profile')
    photo = models.FileField(blank=True, null=True, upload_to='photo/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    followers = models.ManyToManyField('self', related_name='subscribers', blank=True, null=True, symmetrical=False)
    follows = models.ManyToManyField('self', related_name='subscribes', blank=True, null=True, symmetrical=False)

    def __str__(self):
        return self.account.username

