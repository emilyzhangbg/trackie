from django.urls import path
from . import views

urlpatterns = [
    path('', views.posts),
    path('<str:id>/', views.post),
    path('likes/<str:id>/', views.like),
]