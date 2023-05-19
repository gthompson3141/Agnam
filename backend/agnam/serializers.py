from rest_framework import serializers
from .models import Agnam

class AgnamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agnam
        fields = ('id','Title', 'URL', 'Poster')

class CreateAgnamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agnam
        fields = ('URL')
