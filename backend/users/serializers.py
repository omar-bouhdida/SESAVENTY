from rest_framework import serializers
from .models import CustomUser
from shared.enums import Role

class MemberRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=Role.MEMBER
        )
        return user

class CoordinatorRegistrationSerializer(MemberRegistrationSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.role = Role.COORDINATOR
        user.save()
        return user

class RVARegistrationSerializer(MemberRegistrationSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        user.role = Role.STUDENT_LIFE_OFFICER
        user.save()
        return user
