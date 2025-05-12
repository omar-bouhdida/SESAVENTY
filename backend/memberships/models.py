from django.db import models
from users.models import CustomUser
from clubs.models import Club
from shared.enums import MembershipStatus, MembershipRole, Role

class Membership(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': Role.MEMBER},
        related_name='memberships'
    )
    club = models.ForeignKey(
        Club,
        on_delete=models.CASCADE,
        related_name='memberships'
    )
    joined_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=MembershipStatus.choices,
        default=MembershipStatus.PENDING
    )
    role = models.CharField(
        max_length=100,
        choices=MembershipRole.choices,
        default=MembershipRole.MEMBER
    )

    class Meta:
        unique_together = ('user', 'club')

    def __str__(self):
        return f"{self.user.username} in {self.club.name}"
