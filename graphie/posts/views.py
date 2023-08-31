from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Post
from .serializers import PostSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def note(request):
  if (request.method == "GET"):
    user = request.user
    posts = Post.objects.filter(user=user)
    serializer = PostSerializer(many=True, instance=posts)
  elif (request.method == "POST"):
    data = request.data
    user = request.user
    post = Post.objects.create(data)
    serializer = PostSerializer(many=False, instance=posts)

  return Response(serializer.data)
  
  