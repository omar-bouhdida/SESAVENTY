import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/shared/Home';
import NotFound from '../pages/shared/NotFound';
import Unauthorized from '../pages/shared/Unauthorized';
import ResponsableDashboard from '../pages/responsable/Dashboard';
import ClubRequests from '../pages/responsable/ClubRequests';
import CoordinateurDashboard from '../pages/coordinateur/Dashboard';
import CreateEvent from '../pages/coordinateur/CreateEvent';
import ManageMembers from '../pages/coordinateur/ManageMembers';
import ClubDetails from '../pages/membre/ClubDetails';
import EventsView from '../pages/membre/EventsView';
import Clubs from '../pages/etudiant/Clubs';
import CreateClubRequest from '../pages/etudiant/CreateClubRequest';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import { withProtectedRoute } from './ProtectedRoute';
import { withRoleBasedRoute } from './RoleBasedRoute';
import FAQ from '../pages/shared/FAQ';
import Contact from '../pages/shared/Contact';
import PrivacyPolicy from '../pages/shared/legal/PrivacyPolicy';
import TermsOfService from '../pages/shared/legal/TermsOfService';
import LegalNotice from '../pages/shared/legal/LegalNotice';

const AppRoutes = () => [
  // Auth routes with AuthLayout
  {
    element: <AuthLayout><Outlet /></AuthLayout>,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  // Main application routes with MainLayout
  {
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/responsable',
        children: [
          {
            path: 'dashboard',
            element: withProtectedRoute(withRoleBasedRoute(<ResponsableDashboard />, ['RESPONSABLE']))
          },
          {
            path: 'requests',
            element: withProtectedRoute(withRoleBasedRoute(<ClubRequests />, ['RESPONSABLE']))
          }
        ]
      },
      {
        path: '/coordinateur',
        children: [
          {
            path: 'dashboard',
            element: withProtectedRoute(withRoleBasedRoute(<CoordinateurDashboard />, ['COORDINATEUR']))
          },
          {
            path: 'events',
            element: withProtectedRoute(withRoleBasedRoute(<CreateEvent />, ['COORDINATEUR']))
          },
          {
            path: 'members',
            element: withProtectedRoute(withRoleBasedRoute(<ManageMembers />, ['COORDINATEUR']))
          }
        ]
      },
      {
        path: '/clubs',
        children: [
          {
            index: true,
            element: withProtectedRoute(withRoleBasedRoute(<Clubs />, ['ETUDIANT']))
          },
          {
            path: ':id',
            element: withProtectedRoute(withRoleBasedRoute(<ClubDetails />, ['MEMBRE']))
          },
          {
            path: 'create',
            element: withProtectedRoute(withRoleBasedRoute(<CreateClubRequest />, ['ETUDIANT']))
          }
        ]
      },
      {
        path: '/events',
        element: withProtectedRoute(withRoleBasedRoute(<EventsView />, ['MEMBRE']))
      },
      {
        path: '/faq',
        element: <FAQ />
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />
      },
      {
        path: '/legal-notice',
        element: <LegalNotice />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default AppRoutes;