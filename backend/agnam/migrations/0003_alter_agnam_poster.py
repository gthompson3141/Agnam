# Generated by Django 4.1.3 on 2022-11-22 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agnam', '0002_agnam_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agnam',
            name='Poster',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
