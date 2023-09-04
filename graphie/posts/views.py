from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Post
from users.models import Profile
from .serializers import PostSerializer
from users.serializers import ProfileSerializer
from datetime import datetime

def compare_date(post):
  date = post['created_at'].replace('T', ' ').replace('Z', '')

  date_time_obj = datetime.strptime(date, '%Y-%m-%d %H:%M:%S.%f')

  return date_time_obj


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def posts(request):
  if (request.method == "GET"):
    user = request.user
    posts = Post.objects.filter(user=user)
    serializer = PostSerializer(many=True, instance=posts)
    response_data = serializer.data
    response_data.sort(key=compare_date, reverse=True)
  elif (request.method == "POST"):
    data = request.data
    user = request.user

    try:
      image = data["image"]
    except:
      post = Post.objects.create(user=user, caption=data["caption"], hashtags=data["hashtags"])
    else:
      post = Post.objects.create(user=user, caption=data["caption"], hashtags=data["hashtags"], image=data["image"])

    serializer = PostSerializer(many=False, instance=post)
    response_data = serializer.data

  return Response(response_data)
  
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def post(request, id):
  post = Post.objects.get(id=id)
  post.delete()
  return Response('Note was deleted!')  

@api_view(['PUT', 'DELETE'])
def like(request, id):
  post = Post.objects.get(id=id)
  user = request.user
  profile = Profile.objects.get(user=user)
  serializer = PostSerializer(many=False, instance=post)

  if (request.method == 'PUT'):
    # if not (user.id in serializer.data['liked_users']):
      post.liked_users.add(user)
      post.likes = len(post.liked_users.all())
      post.save(update_fields=['likes'])
      profile.liked_posts.add(post)
  else:
    # if user.id in serializer.data['liked_users']:
      post.liked_users.remove(user)
      post.likes = len(post.liked_users.all())
      post.save(update_fields=['likes'])
      profile.liked_posts.remove(post)
  
  serializer = PostSerializer(many=False, instance=post)
  
  return Response(serializer.data)