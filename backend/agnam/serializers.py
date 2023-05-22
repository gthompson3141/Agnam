from rest_framework import serializers
from .models.comic import Comic
from .models.users import User

class ComicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = ('id','Title', 'URL', 'Poster')

class CreateComicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = ('URL')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'fullName', 'email', 'password')
