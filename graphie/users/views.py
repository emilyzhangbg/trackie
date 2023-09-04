from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,  permission_classes
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer, UserSerializer


@api_view(['POST'])
def createUser(request):
  data = request.data
  user = User.objects.create_user(username=data['username'],
                                  first_name=data['first_name'],
                                  last_name=data['last_name'],
                                  email=data['email'],
                                  password=data['password'])
  
  profile = Profile.objects.create(
    user=user,
    bio=data['bio']
  )

  serializer = ProfileSerializer(instance=profile)
  
  return Response(serializer.data)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def returnUser(request):
  user = request.user
  profile = Profile.objects.filter(user=user)
  serializer = ProfileSerializer(instance=profile)