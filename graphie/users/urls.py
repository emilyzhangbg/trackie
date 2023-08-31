from django.urls import path
from . import views

urlpatterns = [
    path("", views.createUser, name='create_user'),
]