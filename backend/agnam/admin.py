from django.contrib import admin
from .models.comic import Comic
from .models.users import User

# Register your models here.
class ComicAdmin(admin.ModelAdmin):
    list_display = ('Title', 'URL', 'Poster')

class UserFields(admin.ModelAdmin):
    list_display = ('user_id', 'fullName', 'email', 'password')

admin.site.register(Comic, ComicAdmin)
admin.site.register(User, UserFields)
