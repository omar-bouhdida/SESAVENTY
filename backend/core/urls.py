# core/urls.py
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from users.views import (
    MemberRegisterView, CoordinatorRegisterView, RVARegisterView,
    LoginView, MeView, CoordinatorsListView, MembersListView, RVAsListView
)
from clubs.views import ClubViewSet, ClubCreationRequestViewSet
from memberships.views import MembershipViewSet
from events.views import EventViewSet

# API Router Configuration
router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
router.register(r'clubs/requests', ClubCreationRequestViewSet, basename='clubrequest')
router.register(r'memberships', MembershipViewSet)
router.register(r'events', EventViewSet)

# URL patterns
urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # Debug toolbar
    path('__debug__/', include('debug_toolbar.urls')),

    # API v1 namespace
    path('api/v1/', include([
        # JWT Authentication
        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
        
        # Authentication & Registration
        path('auth/register/member/', MemberRegisterView.as_view(), name='register-member'),
        path('auth/register/coordinator/', CoordinatorRegisterView.as_view(), name='register-coordinator'),
        path('auth/register/rva/', RVARegisterView.as_view(), name='register-rva'),
        path('auth/login/', LoginView.as_view(), name='login'),
        path('auth/me/', MeView.as_view(), name='me'),

        # User lists by role
        path('users/coordinators/', CoordinatorsListView.as_view(), name='coordinators-list'),
        path('users/members/', MembersListView.as_view(), name='members-list'),
        path('users/rvas/', RVAsListView.as_view(), name='rvas-list'),

        # API router endpoints
        path('', include(router.urls)),
    ])),
    
    # Legacy URL support (for backwards compatibility)
    path('auth/', include([
        path('register/member/', MemberRegisterView.as_view()),
        path('register/coordinator/', CoordinatorRegisterView.as_view()),
        path('register/rva/', RVARegisterView.as_view()),
        path('login/', LoginView.as_view()),
        path('me/', MeView.as_view()),
    ])),
    path('api/', include(router.urls)),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all route for serving the React app
urlpatterns += [
    re_path(r'^(?!api/|admin/|static/|media/).*$', TemplateView.as_view(template_name='index.html')),
]
