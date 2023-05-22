from django.urls import path
from .views import ComicView, CreateComicView, UserView

urlpatterns = [
    path('comics/', ComicView.get_comics),
    path('comics/<str:pk>', ComicView.get_comic),
    path('comics/create/', CreateComicView.post_comic),
    path('user/verifyLogin/', UserView.verifyLogin),
    #path('scraped_data/', CreateAgnamView.scrape_data, name='scraped_data'),
    #path('csrf/', csrf_function),
]
