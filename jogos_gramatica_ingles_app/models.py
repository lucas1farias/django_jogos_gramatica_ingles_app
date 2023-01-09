

from django.db import models


class Base(models.Model):
    created = models.DateTimeField('Data de criação', auto_now_add=True)
    updated = models.DateTimeField('Última atualização', auto_now=True)
    availability = models.BooleanField('Disponibilidade', default=True)

    # Configurar para ser usado por qualquer outro modelo
    class Meta:
        abstract = True


class Nouns(Base):
    question = models.CharField('Questão', max_length=100)
    name = models.CharField('Nome do substantivo', max_length=100)
    translation = models.CharField('Tradução do substantivo', max_length=100)

    def __str__(self):
        return self.name

    # Rótulos para o Django template admin
    class Meta:
        verbose_name = 'Substantivo'
        verbose_name_plural = verbose_name + 's'
