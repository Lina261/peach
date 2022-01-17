from api import views
from django.urls import path, include
from api.views import RegisterAccount, HomePage

urlpatterns = [
    path('register/', RegisterAccount.as_view()),
    path('user-info/', HomePage.as_view())
]