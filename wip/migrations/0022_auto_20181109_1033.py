# Generated by Django 2.1.3 on 2018-11-09 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wip', '0021_auto_20181108_1550'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='closed_date',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='timeentry',
            name='signed_off_date',
            field=models.DateTimeField(blank=True, editable=False, null=True),
        ),
    ]