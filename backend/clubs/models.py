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

    class Meta:
        verbose_name = 'Club Creation Request'
        verbose_name_plural = 'Club Creation Requests'
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.club_name} request by {self.coordinator.username}"

    def approve(self, reviewer: CustomUser) -> None:
        self.status = RequestStatus.APPROVED
        self.reviewed_at = models.DateTimeField(auto_now=True)
        self.reviewed_by = reviewer
        self.save()

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

    class Meta:
        verbose_name = 'Club'
        verbose_name_plural = 'Clubs'
        ordering = ['name']

    def __str__(self):
        return self.name

    def member_count(self) -> int:
        return self.memberships.filter(status='active').count()

    def get_members(self):
        return [m.user for m in self.memberships.all()]

    def get_events(self):
        return self.events.all()