from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ComicSerializer, CreateComicSerializer, UserSerializer
from .models.comic import Comic
from .models.users import User
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .scraper import scrape_data
from django.contrib.auth.hashers import make_password

# Create your views here.

class ComicView(viewsets.ModelViewSet):

    def get_queryset(self):
        return Comic.objects.all()

    def get_serializer_class(self):
        return ComicSerializer

    # Return all comics 
    @api_view(['GET'])
    def get_comics(request):
        comics = Comic.objects.all()
        serializer_class = ComicSerializer(comics, many=True)
        return Response(serializer_class.data)

    # Return comics matching search for title
    @api_view(['GET'])
    def get_comic(request, pk):
        comics = Comic.objects.get(Title=pk)
        serializer_class = ComicSerializer(comics, many=False)
        return Response(serializer_class.data)

    # Return daily reccomended comics
    @api_view(['GET'])
    def get_rec_comics(request):
        comics = Comic.objects.all()
        # todo

class CreateComicView(viewsets.ModelViewSet):

    # Receiving URL from webpage, then requesting method to fill in the rest of the Object's 
    # information using the entered URL
    @csrf_exempt
    @api_view(['POST'])
    def post_comic(request):

        # From url in POST request, pass to scrape script to get the rest of the data 
        if request.method == "POST":
            comic = Comic()
            data = request.data.get('URL')
            comic.URL = data
            scrape_data(data, 'title')
            comic.Title = scrape_data(data, 'title')
            comic.Poster = scrape_data(data, 'poster')
            comic.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid request'})    

class UserView(viewsets.ModelViewSet):

    # add permission to check if user is authenticated
    # permission_classes = [IsAuthenticated]

    # add allowed methods
    # http_method_names = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']

    """
    Example empty viewset demonstrating the standard
    actions that will be handled by a router class.

    If you're using format suffixes, make sure to also include
    the `format=None` keyword argument for each action.
    """

    # for API to return all objects, get_queryset in a view must present, unless you use tastypie API instead (format will be different)
    def get_queryset(self):
        return User.objects.all()

    # using get_queryset above will require the get_serializer_class below
    def get_serializer_class(self):
        return UserSerializer
    
    def set_pwd(plainPWD):
        return make_password(
            plainPWD, salt="7henRK5NTDyrT7NpEWv6Zg==", hasher="pbkdf2_sha1"
        )

    @csrf_exempt
    @api_view(['POST'])
    def verifyLogin(request):
        try:
            # Unwrap the params from the request data
            providedEmail = request.data.get('email')
            providedPwd = request.data.get('password')

            # Check if provided data exists in DB
            _user = User.objects.filter(email=providedEmail).first()

            if not _user:
                return JsonResponse({"error": "Invalid email"}, status=400)
            else:
                _serialized_user = UserSerializer(_user)
                result = dict()  # format the result container to dictionary
                result["data"] = _serialized_user.data  # assign data into the container
                if result["data"]["email"] == providedEmail:
                    if result["data"]["password"] == UserView.set_pwd(providedPwd):
                        return JsonResponse({"message": "Login successful"}, status=200)
                    else:
                        return JsonResponse({"error": "Invalid password"}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    # @csrf_exempt
    # @api_view(['POST'])
    # def post_comic(request):
    #     if request.method == "POST":
    #         Comic = Comic()
    #         data = request.data.get('URL')
    #         Comic.URL = data
    #         scrape_data(data, 'title')
    #         Comic.Title = scrape_data(data, 'title')
    #         Comic.Poster = scrape_data(data, 'poster')
    #         Comic.save()
    #         return JsonResponse({'success': True})
    #     else:
    #         return JsonResponse({'error': 'Invalid request'})

    # @api_view(["PUT"])
    # def put(request, user_id):
    #     user_id = int(user_id)
    #     try:
    #         # locate the existing object
    #         _appConfig = engineer.objects.get(engineerID=engineer_id)
    #         if request.method == "PUT":
    #             # Fetch frontend validated data
    #             kwargs = json.loads(request.data.get("values"))
    #             # check existing indice, only dynamically update the fields that passed through
    #             for index in kwargs:
    #                 if index:
    #                     setattr(_appConfig, index, kwargs[index])
    #                 elif index == "password":
    #                     setattr(
    #                         _appConfig,
    #                         index,
    #                         make_password(
    #                             kwargs[index],
    #                             salt="7henRK5NTDyrT7NpEWv6Zg==",
    #                             hasher="pbkdf2_sha1",
    #                         ),
    #                     )
    #                 else:
    #                     continue
    #             # update the database record
    #             _appConfig.save()
    #             # inform frontend the object was updated
    #             return Response(HTTP_200_OK)
    #     except Exception as e:
    #         return Response(
    #             e,
    #             status=HTTP_500_INTERNAL_SERVER_ERROR,
    #             template_name=None,
    #             content_type=None,
    #         )

    # @api_view(["POST"])
    # def post(request):
    #     """
    #     Object Deserialisation:
    #     use json.loads to convert a python dictionary to json serializable string
    #     """
    #     try:
    #         if request.method == "POST":
    #             # Fetch frontend validated data
    #             kwargs = json.loads(request.data.get("values"))
    #             _appConfig = User(**kwargs)
    #             _appConfig.save()
    #             return Response(HTTP_200_OK)
    #     except Exception as e:
    #         return Response(
    #             e,
    #             status=HTTP_500_INTERNAL_SERVER_ERROR,
    #             template_name=None,
    #             content_type=None,
    #         )
        
    # @api_view(["DELETE"])
    # def delete(self, engineer_id):
    #     # make sure data type is correct before pass it into sql query
    #     engineer_id = int(engineer_id)
    #     try:
    #         # search, locate and delete
    #         engineer.objects.get(engineerID=engineer_id).delete()
    #         return Response(HTTP_200_OK)
    #     except Exception as e:
    #         return Response(
    #             e,
    #             status=HTTP_500_INTERNAL_SERVER_ERROR,
    #             template_name=None,
    #             content_type=None,
    #         )

    # @action(detail=False, methods=["get"])
    # def resetPassword(self, request):
    #     try:
    #         # Unwrap the params from the request data
    #         providedEmail = request.data.get("email")

    #         # Check if provided data existing in DB
    #         _engineer = engineer.objects.filter(email=providedEmail).first()

    #         if not _engineer:
    #             return Response(False, status=HTTP_500_INTERNAL_SERVER_ERROR)
    #         else:
    #             # Todo - send reset email should be programmed here
    #             return Response(
    #                 True, status=HTTP_200_OK, template_name=None, content_type=None
    #             )
    #     except Exception as e:
    #         return Response(
    #             e,
    #             status=HTTP_500_INTERNAL_SERVER_ERROR,
    #             template_name=None,
    #             content_type=None,
    #         )

   
      