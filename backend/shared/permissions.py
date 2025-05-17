# shared/permissions.py
from rest_framework import permissions
from clubs.models import Club
from memberships.models import Membership

class IsRVA(permissions.BasePermission):
    """
    Seul le Responsable Vie Associative (RVA) peut accéder.
    """
    def has_permission(self, request, view):
        return (
            request.user 
            and request.user.is_authenticated 
            and request.user.role == 'student_life_officer'
        )

class IsClubCoordinator(permissions.BasePermission):
    """
    Seul le coordinateur du club concerné peut accéder.
    """
    def has_permission(self, request, view):
        # Récupère l'ID du club depuis l'URL kwargs ou depuis les données
        club_id = view.kwargs.get('club_pk') or request.data.get('club')
        if not club_id:
            return False
        try:
            club = Club.objects.get(pk=club_id)
        except Club.DoesNotExist:
            return False
        return (
            request.user 
            and request.user.is_authenticated 
            and club.coordinator_id == request.user.id
        )

    def has_object_permission(self, request, view, obj):
        # obj peut être un Membership, un Event, etc., qui a obj.club
        return (
            request.user 
            and request.user.is_authenticated 
            and getattr(obj.club, 'coordinator_id', None) == request.user.id
        )

class IsMembershipOwner(permissions.BasePermission):
    """
    Permet à un membre de voir/modifier seulement SA propre adhésion.
    """
    def has_object_permission(self, request, view, obj):
        # obj est une instance de Membership
        return obj.user_id == request.user.id
