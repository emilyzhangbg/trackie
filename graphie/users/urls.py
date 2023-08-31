from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.createUser, name='create_user'),
]