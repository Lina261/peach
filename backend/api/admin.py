from django.contrib import admin
from .models import Account, Profile, Video


class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email')


admin.site.register(Account, AccountAdmin)
admin.site.register(Video)
admin.site.register(Profile)
