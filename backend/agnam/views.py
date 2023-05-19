from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import AgnamSerializer, CreateAgnamSerializer
from .models import Agnam
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .scraper import scrape_data

# Create your views here.

class AgnamView(viewsets.ModelViewSet):

    def get_queryset(self):
        return Agnam.objects.all()

    def get_serializer_class(self):
        return AgnamSerializer

    # Return all comics 
    @api_view(['GET'])
    def get_comics(request):
        comics = Agnam.objects.all()
        serializer_class = AgnamSerializer(comics, many=True)
        return Response(serializer_class.data)

    # Return comics matching search for title
    @api_view(['GET'])
    def get_comic(request, pk):
        comics = Agnam.objects.get(Title=pk)
        serializer_class = AgnamSerializer(comics, many=False)
        return Response(serializer_class.data)

    # Return daily reccomended comics
    @api_view(['GET'])
    def get_rec_comics(request):
        comics = Agnam.objects.all()
        # todo

class CreateAgnamView(viewsets.ModelViewSet):

    # Receiving URL from webpage, then requesting method to fill in the rest of the Object's 
    # information using the entered URL
    @csrf_exempt
    @api_view(['POST'])
    def post_comic(request):

        # From url in POST request, pass to scrape script to get the rest of the data 
        if request.method == "POST":
            agnam = Agnam()
            data = request.data.get('URL')
            agnam.URL = data
            scrape_data(data, 'title')
            agnam.Title = scrape_data(data, 'title')
            agnam.Poster = scrape_data(data, 'poster')
            agnam.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid request'})      

   
      