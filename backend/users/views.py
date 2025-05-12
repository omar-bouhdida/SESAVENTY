from rest_framework import generics, permissions
from .serializers import MemberRegistrationSerializer, CoordinatorRegistrationSerializer, RVARegistrationSerializer

class MemberRegisterView(generics.CreateAPIView):
    serializer_class = MemberRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class CoordinatorRegisterView(generics.CreateAPIView):
    serializer_class = CoordinatorRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class RVARegisterView(generics.CreateAPIView):
    serializer_class = RVARegistrationSerializer
    permission_classes = [permissions.AllowAny]