from django.urls import path
from . import views

urlpatterns = [
    path("", views.createUser, name='create_user'),
    path("returnUser/", views.returnUser, name='return_user'),
    path("updateProfile/", views.updateProfile, name='update_profile'),
]