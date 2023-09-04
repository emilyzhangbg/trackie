from django.urls import path
from . import views

urlpatterns = [
    path("", views.createUser, name='create_user'),
    path("id/", views.userId, name='user_id')
]