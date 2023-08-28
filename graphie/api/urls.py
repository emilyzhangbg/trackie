from django.urls import path
from . import views

urlpatterns = [
    path('anny/', views.getRoutes, name="routes"),
]