from api import views
from django.urls import path, include
from api.views import RegisterAccount, HomePage, ProfileInfo,  PeoplePage, ProfilePage

urlpatterns = [
    path('register/', RegisterAccount.as_view()),
    path('home/', HomePage.as_view()),
    path('user-info/', ProfileInfo.as_view()),
    path('profile/', ProfilePage.as_view()),
    path('people/', PeoplePage.as_view())
]
