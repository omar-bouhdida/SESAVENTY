from rest_framework import serializers
from .models import Membership

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['id', 'user', 'club', 'role', 'status', 'joined_at']
        read_only_fields = ['id', 'joined_at']