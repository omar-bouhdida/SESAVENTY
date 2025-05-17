from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import RegistrationSerializer, UserSerializer
from .utils import generate_user_response
from shared.enums import Role
import logging

logger = logging.getLogger(__name__)

class MemberRegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self): 
        return {'role': Role.MEMBER}
    
    def create(self, request, *args, **kwargs):
        logger.info(f"Received registration request: {request.data}")
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"Registration validation error: {serializer.errors}")
            return Response({
                'status': 'error',
                'errors': serializer.errors,
                'message': 'Registration failed due to validation errors'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = serializer.save()
            logger.info(f"User registered successfully: {user.username}")
            
            # Generate tokens for the user
            refresh = RefreshToken.for_user(user)
            
            response_data = {
                'status': 'success',
                'message': 'Registration successful',
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
            
            logger.info(f"Registration completed for {user.username} with token generation")
            return Response(response_data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            logger.error(f"Error during registration process: {str(e)}")
            return Response({
                'status': 'error',
                'message': f'Registration failed: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CoordinatorRegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self): 
        return {'role': Role.COORDINATOR}
    
    def create(self, request, *args, **kwargs):
        logger.info(f"Received coordinator registration request: {request.data}")
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"Coordinator registration validation error: {serializer.errors}")
            return Response({
                'status': 'error',
                'errors': serializer.errors,
                'message': 'Registration failed due to validation errors'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        logger.info(f"Coordinator registered successfully: {user.username}")
        
        response_data = {
            'status': 'success',
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
        }
        
        # Include token for direct login
        from rest_framework_simplejwt.tokens import RefreshToken
        tokens = RefreshToken.for_user(user)
        response_data['access'] = str(tokens.access_token)
        response_data['refresh'] = str(tokens)
        
        return Response(response_data, status=status.HTTP_201_CREATED)

class RVARegisterView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self): 
        return {'role': Role.STUDENT_LIFE_OFFICER}
    
    def create(self, request, *args, **kwargs):
        logger.info(f"Received RVA registration request: {request.data}")
        serializer = self.get_serializer(data=request.data)
        
        if not serializer.is_valid():
            logger.error(f"RVA registration validation error: {serializer.errors}")
            return Response({
                'status': 'error',
                'errors': serializer.errors,
                'message': 'Registration failed due to validation errors'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        logger.info(f"RVA registered successfully: {user.username}")
        
        response_data = {
            'status': 'success',
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
        }
        
        # Include token for direct login
        from rest_framework_simplejwt.tokens import RefreshToken
        tokens = RefreshToken.for_user(user)
        response_data['access'] = str(tokens.access_token)
        response_data['refresh'] = str(tokens)
        
        return Response(response_data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        logger.info(f"Login attempt for user: {username}")
        
        user = authenticate(request, username=username, password=password)
        if user:
            logger.info(f"Login successful for user: {username}")
            # Generate tokens for the user
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'status': 'success',
                'message': 'Login successful',
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        
        logger.warning(f"Login failed for user: {username}")
        return Response({
            'status': 'error',
            'detail': 'Invalid credentials'
        }, status=status.HTTP_400_BAD_REQUEST)

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class CoordinatorsListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return CustomUser.objects.filter(role=Role.COORDINATOR)

class MembersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return CustomUser.objects.filter(role=Role.MEMBER)

class RVAsListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return CustomUser.objects.filter(role=Role.STUDENT_LIFE_OFFICER)
