

from django.views.generic import TemplateView
from .models import *
from random import choice


class Index(TemplateView):
    template_name = 'index.html'


class NounGame(TemplateView):
    template_name = 'game_noun.html'

    score_minus = 0
    score_plus = 0
    emergency_exit = 'DIGITE 0 P/ ENCERRAR O ALGORITMO'
    cease = '\nALGORITMO FINALIZADO MANUALMENTE'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.db = Nouns.objects.all()
        self.question = choice(self.db)
        self.nouns = self.get_four_noun_objects(size=5)
        self.answer = self.pick_noun_translation_index()

    def get_four_noun_objects(self, size):
        nouns_box = set({})
        nouns_box.add(self.question)
        while len(nouns_box) < size:
            random_noun_object = choice(self.db)
            nouns_box.add(random_noun_object)
        return list(nouns_box)

    def pick_noun_translation_index(self):
        right_answer_index = []
        for index, each_noun in enumerate(self.nouns):
            # Teremos 5 opções (alternativas 1 a 5), como "index" começa em 0, aqui ele é configurado p/ começar em 1
            index = index + 1
            if self.question.name == each_noun.name:
                # Guardar índice da alternativa correta (alterado +1)
                right_answer_index.append(index)
        return str(right_answer_index[0])

    def get_context_data(self, **kwargs):
        context = super(NounGame, self).get_context_data(**kwargs)
        context['question'] = self.question.question
        context['alternatives'] = self.nouns
        context['answer'] = self.answer
        return context
