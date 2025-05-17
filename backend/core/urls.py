# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin

from users.views import (
    MemberRegisterView, CoordinatorRegisterView, RVARegisterView,
    LoginView, MeView, CoordinatorsListView, MembersListView, RVAsListView
)
from clubs.views import ClubViewSet, ClubCreationRequestViewSet
from memberships.views import MembershipViewSet
from events.views import EventViewSet

router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
router.register(r'clubs/requests', ClubCreationRequestViewSet, basename='clubrequest')
router.register(r'memberships', MembershipViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

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

    # API router for clubs, memberships, events
    path('api/', include(router.urls)),
]
