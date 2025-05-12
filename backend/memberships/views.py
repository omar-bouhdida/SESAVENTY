from rest_framework import viewsets, permissions
from .models import Membership
from .serializers import MembershipSerializer

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]