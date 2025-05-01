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
import { withProtectedRoute } from './ProtectedRoute';
import { withRoleBasedRoute } from './RoleBasedRoute';

const AppRoutes = () => [
  {
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default AppRoutes;