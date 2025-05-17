from django.db import models

class Role(models.TextChoices):
    MEMBER = 'member', 'Member'
    COORDINATOR = 'coordinator', 'Coordinator'
    STUDENT_LIFE_OFFICER = 'student_life_officer', 'Student Life Officer'

class RequestStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    APPROVED = 'approved', 'Approved'
    REJECTED = 'rejected', 'Rejected'

class ClubStatus(models.TextChoices):
    PENDING = 'pending', 'Pending Validation'
    ACTIVE = 'active', 'Active'
    ARCHIVED = 'archived', 'Archived'

class EventType(models.TextChoices):
    PUBLIC = 'public', 'Public'
    PRIVATE = 'private', 'Private'

class EventStatus(models.TextChoices):
    UPCOMING = 'upcoming', 'Upcoming'
    COMPLETED = 'completed', 'Completed'
    CANCELLED = 'cancelled', 'Cancelled'

class MembershipStatus(models.TextChoices):
    PENDING = 'pending', 'Pending'
    ACTIVE = 'active', 'Active'
    REJECTED = 'rejected', 'Rejected'

class MembershipRole(models.TextChoices):
    MEMBER = 'member', 'Member'
    TREASURY = "treasury", "Treasury"
    SECRETARY = "secretary", "Secretary"
    VICE_PRESIDENT = "vice_president", "Vice President"
    COMMUNICATION_MANAGER = "communication_manager", "Communication Manager"
    MEDIA_MANAGER = "media_manager", "Media Manager"
    HR_MANAGER = "hr_manager", "HR Manager"
    SPONSOR_MANAGER = "sponsor_manager", "Sponsorship Manager"
    DESIGNER = "designer", "Graphic Designer"