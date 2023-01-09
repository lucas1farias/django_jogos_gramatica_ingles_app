

from django.contrib import admin
from .models import *


@admin.register(Nouns)
class NounsAdmin(admin.ModelAdmin):
    list_display = ('question', 'name', 'translation', 'created', 'updated', 'availability')
