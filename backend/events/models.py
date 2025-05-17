from django.db import models
from clubs.models import Club
from users.models import CustomUser
from shared.enums import EventType, EventStatus, Role

class Event(models.Model):
    club = models.ForeignKey(
        Club,
        on_delete=models.CASCADE,
        related_name='events'
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=200)
    event_type = models.CharField(
        max_length=20,
        choices=EventType.choices,
        default=EventType.PUBLIC
    )
    status = models.CharField(
        max_length=20,
        choices=EventStatus.choices,
        default=EventStatus.UPCOMING
    )
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': Role.COORDINATOR},
        related_name='created_events'
    )

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
        ordering = ['-start_time']

    def __str__(self) -> str:
        return self.title

    def is_upcoming(self) -> bool:
        from django.utils import timezone
        return self.start_time > timezone.now()

    def is_past(self) -> bool:
        from django.utils import timezone
        return self.end_time < timezone.now()
