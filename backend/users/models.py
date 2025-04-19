from django.contrib.auth.models import AbstractUser
from django.db import models
from shared.enums import Role

class CustomUser(AbstractUser):
    role = models.CharField(
        max_length=30,
        choices=Role.choices,
        default=Role.MEMBER
    )
    profile_picture = models.ImageField(
        upload_to='users/profile_pictures/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.get_full_name() or self.username
