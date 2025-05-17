import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ClubsList from './pages/clubs/ClubsList';
import ClubDetails from './pages/clubs/ClubDetails';
import CreateClub from './pages/clubs/CreateClub';
import EventsList from './pages/events/EventsList';
import EventDetails from './pages/events/EventDetails';
import CreateEvent from './pages/events/CreateEvent';
import ProfilePage from './pages/Profile';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Club Routes */}
              <Route path="/clubs" element={
                <ProtectedRoute>
                  <ClubsList />
                </ProtectedRoute>
              } />
              <Route path="/clubs/:id" element={
                <ProtectedRoute>
                  <ClubDetails />
                </ProtectedRoute>
              } />
              <Route path="/clubs/create" element={
                <ProtectedRoute>
                  <CreateClub />
                </ProtectedRoute>
              } />
              
              {/* Event Routes */}
              <Route path="/events" element={
                <ProtectedRoute>
                  <EventsList />
                </ProtectedRoute>
              } />
              <Route path="/events/:id" element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              } />
              <Route path="/events/create" element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              } />
              
              {/* Profile */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
