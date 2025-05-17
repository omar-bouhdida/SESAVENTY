from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Membership
from .serializers import MembershipSerializer

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='by-club/(?P<club_id>[^/.]+)')
    def by_club(self, request, club_id=None):
        memberships = self.queryset.filter(club_id=club_id)
        page = self.paginate_queryset(memberships)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(memberships, many=True)
        return Response(serializer.data)
