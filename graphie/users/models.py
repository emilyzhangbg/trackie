from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    age = models.IntegerField(null = True, blank = True)

    def __str__(self):
        return self.user.username