# Generated by Django 3.2.13 on 2023-01-09 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jogos_gramatica_ingles_app', '0007_auto_20230108_2216'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Data de criação')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Última atualização')),
                ('availability', models.BooleanField(default=True, verbose_name='Disponibilidade')),
                ('answer_number', models.CharField(max_length=100, verbose_name='Resposta do número da alternativa')),
            ],
            options={
                'verbose_name': 'Resposta da alternativa',
                'verbose_name_plural': 'Respostas das alternativas',
            },
        ),
    ]
