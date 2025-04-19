from django.db import models
from users.models import CustomUser
from shared.enums import ClubStatus, RequestStatus, Role

class ClubCreationRequest(models.Model):
    club_name = models.CharField(max_length=100)
    description = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=RequestStatus.choices,
        default=RequestStatus.PENDING
    )
    coordinator = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': Role.COORDINATOR},
        related_name='club_creation_requests'
    )
    student_life_officer_comment = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.club_name} request by {self.coordinator.username}"
    
class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=ClubStatus.choices,
        default=ClubStatus.PENDING
    )
    coordinator = models.OneToOneField(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={'role': Role.COORDINATOR},
        related_name='coordinated_club'
    )
    creation_request = models.OneToOneField(
        ClubCreationRequest,
        on_delete=models.CASCADE,
        related_name='club',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name