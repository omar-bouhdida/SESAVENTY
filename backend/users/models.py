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

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['username']

    def __str__(self):
        return self.get_full_name() or self.username

    def get_full_name(self) -> str:
        return super().get_full_name()

    def has_role(self, role: str) -> bool:
        return self.role == role