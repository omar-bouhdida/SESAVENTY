# Generated by Django 4.2.20 on 2025-04-21 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("memberships", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="membership",
            name="role",
            field=models.CharField(
                choices=[
                    ("member", "Member"),
                    ("treasury", "Treasury"),
                    ("secretary", "Secretary"),
                    ("vice_president", "Vice President"),
                    ("communication_manager", "Communication Manager"),
                    ("media_manager", "Media Manager"),
                    ("hr_manager", "HR Manager"),
                    ("sponsor_manager", "Sponsorship Manager"),
                    ("designer", "Graphic Designer"),
                ],
                default="member",
                max_length=100,
            ),
        ),
    ]
