

from django.urls import path
from .views import *

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('game_noun', NounGame.as_view(), name='game_noun')
]
