from django.contrib import admin
from .models import Agnam

# Register your models here.
class AgnamAdmin(admin.ModelAdmin):
    list_display = ('Title', 'URL', 'Poster')

admin.site.register(Agnam, AgnamAdmin)
