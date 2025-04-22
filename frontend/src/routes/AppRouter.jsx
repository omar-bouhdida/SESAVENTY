import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import AdminDashboardPage from '../pages/Dashboard/AdminDashboardPage/AdminDashboardPage';
import CoordinatorDashboardPage from '../pages/Dashboard/CoordinatorDashboardPage/CoordinatorDashboardPage';
import MemberDashboardPage from '../pages/Dashboard/MemberDashboardPage/MemberDashboardPage';
import ClubListingPage from '../pages/Clubs/ClubListingPage/ClubListingPage';
import ClubCreationPage from '../pages/Clubs/ClubCreationPage/ClubCreationPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes with main layout (navbar) */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="clubs" element={<ClubListingPage />} />

        {/* Protected routes */}
        <Route
          path="admin/*"
          element={
            <PrivateRoute allowedRoles={['CommunityManager']}>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="coordinator/*"
          element={
            <PrivateRoute allowedRoles={['ClubCoordinator']}>
              <CoordinatorDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="clubs/new"
          element={
            <PrivateRoute allowedRoles={['ClubCoordinator']}>
              <ClubCreationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="member/*"
          element={
            <PrivateRoute allowedRoles={['ClubMember']}>
              <MemberDashboardPage />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Auth routes with minimal layout */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* 404 - with main layout */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;