from django.urls import path
from .views import AgnamView, CreateAgnamView

urlpatterns = [
    path('comics/', AgnamView.get_comics, name="comics"),
    path('comics/<str:pk>', AgnamView.get_comic, name="comic"),
    path('comics/create/', CreateAgnamView.post_comic),
    #path('scraped_data/', CreateAgnamView.scrape_data, name='scraped_data'),
    #path('csrf/', csrf_function),
]
