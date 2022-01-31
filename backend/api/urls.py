from api import views
from django.urls import path, include
from api.views import RegisterAccount, HomePage, ProfileInfo

urlpatterns = [
    path('register/', RegisterAccount.as_view()),
    path('home/', HomePage.as_view()),
    path('user-info/', ProfileInfo.as_view())
]
