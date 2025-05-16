from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'club', 'title', 'description', 'start_time', 'end_time', 'location', 'event_type', 'status', 'created_by']
        read_only_fields = ['id']