import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import AuthPage from './pages/auth/AuthPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { ClubsPage, ClubDetailsPage, CreateEditClubPage } from './pages/clubs';
import { EventsPage, EventDetailsPage, CreateEditEventPage } from './pages/events';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<AuthPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Club Routes */}
            <Route
              path="/clubs"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ClubsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clubs/create"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateEditClubPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clubs/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ClubDetailsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/clubs/:id/edit"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateEditClubPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Event Routes */}
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <EventsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/events/create"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateEditEventPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/events/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <EventDetailsPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/events/:id/edit"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateEditEventPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Members Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Profile Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div>Settings Page - Coming Soon</div>
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/unauthorized"
              element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Unauthorized</h2>
                  <p>You don't have permission to access this page.</p>
                </div>
              }
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
