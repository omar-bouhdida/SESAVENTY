import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { ClubProvider } from './contexts/ClubContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';

function App() {
  const router = createBrowserRouter(AppRoutes(), {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <ClubProvider>
            <EventProvider>
              <RouterProvider router={router} />
            </EventProvider>
          </ClubProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
