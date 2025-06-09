from rest_framework import serializers
from .models import Club, ClubCreationRequest

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'status', 'coordinator', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

class ClubCreationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubCreationRequest
        fields = ['id', 'club_name', 'description', 'status', 'coordinator', 'student_life_officer_comment', 'submitted_at', 'reviewed_at', 'reviewed_by']
        read_only_fields = ['id', 'status', 'submitted_at', 'reviewed_at', 'reviewed_by']