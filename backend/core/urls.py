from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from users.views import MemberRegisterView, CoordinatorRegisterView, RVARegisterView
from clubs.views import ClubViewSet, ClubCreationRequestViewSet
from memberships.views import MembershipViewSet
from events.views import EventViewSet

router = DefaultRouter()
router.register(r'clubs', ClubViewSet)
router.register(r'clubs/requests', ClubCreationRequestViewSet, basename='clubrequest')
router.register(r'memberships', MembershipViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    path('/admin/', admin.site.urls),
    path('auth/register/member/', MemberRegisterView.as_view(), name='register-member'),
    path('auth/register/coordinator/', CoordinatorRegisterView.as_view(), name='register-coordinator'),
    path('auth/register/rva/', RVARegisterView.as_view(), name='register-rva'),
    path('', include(router.urls)),
]
