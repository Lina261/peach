from django.urls import path
from api.views import RegisterAccount, HomePage, ProfileInfo, PeoplePage, ProfilePage, Subscribe, Unsubscribe, Follows, \
    Followers, VideoView, ProfileDetail, FindAccount, VideoUpload, PhotoUpload, UserFollows, UserFollowers

urlpatterns = [
    path('register/', RegisterAccount.as_view()),
    path('home/', HomePage.as_view()),
    path('user-info/', ProfileInfo.as_view()),
    path('profile/', ProfilePage.as_view()),
    path('people/', PeoplePage.as_view()),
    path('subscribe/', Subscribe.as_view()),
    path('unsubscribe/', Unsubscribe.as_view()),
    path('follows/', Follows.as_view()),
    path('followers/', Followers.as_view()),
    path('<int:id>/follows/', UserFollows.as_view()),
    path('<int:id>/followers/', UserFollowers.as_view()),
    path('video/', VideoView.as_view()),
    path('upload-video/', VideoUpload.as_view()),
    path('upload-photo/', PhotoUpload.as_view()),
    path('find-account/', FindAccount.as_view()),
    path('profile/<int:id>/', ProfileDetail.as_view()),
]
