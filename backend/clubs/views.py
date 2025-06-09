from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Club, ClubCreationRequest
from .serializers import ClubSerializer, ClubCreationRequestSerializer
from shared.enums import RequestStatus
from django.utils import timezone
from memberships.models import Membership
from events.models import Event
from users.serializers import UserSerializer
from events.serializers import EventSerializer

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'], url_path='members')
    def members(self, request, pk=None):
        users = [m.user for m in Membership.objects.filter(club_id=pk)]
        return Response(UserSerializer(users, many=True).data)

    @action(detail=True, methods=['get'], url_path='events')
    def club_events(self, request, pk=None):
        events = Event.objects.filter(club_id=pk)
        return Response(EventSerializer(events, many=True).data)

    @action(detail=True, methods=['get'], url_path='coordinator')
    def club_coordinator(self, request, pk=None):
        coord = self.get_object().coordinator
        return Response(UserSerializer(coord).data)

class ClubCreationRequestViewSet(viewsets.ModelViewSet):
    queryset = ClubCreationRequest.objects.all()
    serializer_class = ClubCreationRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['patch'], url_path='approve')
    def approve(self, request, pk=None):
        req = self.get_object()
        req.status = RequestStatus.APPROVED
        req.reviewed_at = timezone.now()
        req.reviewed_by = request.user
        req.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['patch'], url_path='reject')
    def reject(self, request, pk=None):
        req = self.get_object()
        req.status = RequestStatus.REJECTED
        req.reviewed_at = timezone.now()
        req.reviewed_by = request.user
        req.save()
        return Response({'status': 'rejected'})