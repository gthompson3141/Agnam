from django.db import models

# Create your models here.

class Comic(models.Model):
    Title = models.CharField(max_length=120)
    URL = models.URLField(max_length=1000)
    Poster = models.CharField(max_length=1000)

    def _str_(self):
        return self.Title

