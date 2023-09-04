from django.db import models
from django.contrib.auth.models import User
from posts.models import Post

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    liked_posts = models.ManyToManyField(Post, related_name="liked", default=[])

    def __str__(self):
        return self.user.username