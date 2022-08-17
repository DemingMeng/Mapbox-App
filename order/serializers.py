
from rest_framework import serializers
from .models import Post


class PostSerializerWithID(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = []


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ['id']

  