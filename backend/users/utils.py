"""
Utility functions for user management.
"""
import logging
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

logger = logging.getLogger(__name__)

def generate_user_response(user, include_tokens=True):
    """
    Generate a consistent response format for user authentication.
    
    Args:
        user: The user instance
        include_tokens: Whether to include JWT tokens (default: True)
        
    Returns:
        Dict containing user data and authentication tokens
    """
    try:
        # Prepare basic response with user data
        response_data = {
            'status': 'success',
            'user': UserSerializer(user).data,
        }
        
        # Add tokens if requested
        if include_tokens:
            try:
                refresh = RefreshToken.for_user(user)
                response_data['access'] = str(refresh.access_token)
                response_data['refresh'] = str(refresh)
                logger.info(f"Generated tokens for user: {user.username}")
            except Exception as token_error:
                logger.error(f"Error generating tokens for {user.username}: {str(token_error)}")
                response_data['token_error'] = "Could not generate authentication tokens"
        
        return response_data
    except Exception as e:
        logger.error(f"Error generating user response for {user.username}: {str(e)}")
        raise
