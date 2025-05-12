from rest_framework import serializers
from .models import Club, ClubCreationRequest

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class ClubCreationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubCreationRequest
        fields = ('id', 'club_name', 'description', 'status', 'coordinator', 'student_life_officer_comment')
        read_only_fields = ('status', 'coordinator')