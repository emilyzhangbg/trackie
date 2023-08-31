from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'id',]

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Post
    fields = ['user','caption', 'liked_users', 'likes', 'hashtags', 'id', 'image', 'created_at']
