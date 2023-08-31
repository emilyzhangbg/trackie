from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer
from datetime import datetime

def compare_date(post):
  date = post['created_at'].replace('T', ' ').replace('Z', '')

  date_time_obj = datetime.strptime(date, '%Y-%m-%d %H:%M:%S.%f')

  return date_time_obj


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def note(request):
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
  
  