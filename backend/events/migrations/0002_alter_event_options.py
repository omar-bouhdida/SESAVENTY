# Generated by Django 4.2.20 on 2025-05-16 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="event",
            options={
                "ordering": ["-start_time"],
                "verbose_name": "Event",
                "verbose_name_plural": "Events",
            },
        ),
    ]
