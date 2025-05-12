from rest_framework import viewsets, permissions
from .models import Club, ClubCreationRequest
from .serializers import ClubSerializer, ClubCreationRequestSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [permissions.IsAuthenticated]

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
