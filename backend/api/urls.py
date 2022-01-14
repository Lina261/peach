from api import views
from django.urls import path, include
from api.views import RegisterAccount

urlpatterns = [
    path('register/', RegisterAccount.as_view())
]