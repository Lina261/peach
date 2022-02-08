from django.contrib import admin
from .models import Account, Profile, Video


class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email')


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'account')
    filter_horizontal = ('followers', 'follows')


admin.site.register(Account, AccountAdmin)
admin.site.register(Video)
admin.site.register(Profile, ProfileAdmin)
