# Generated by Django 4.1.3 on 2022-11-29 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agnam', '0005_alter_agnam_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agnam',
            name='Title',
            field=models.CharField(max_length=120),
        ),
    ]
