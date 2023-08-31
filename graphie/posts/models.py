from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True)
    caption = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    hashtags = models.CharField(max_length=300, null=True, blank=True)
    liked_users = models.ManyToManyField(User, related_name="liked", default=[])
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.caption