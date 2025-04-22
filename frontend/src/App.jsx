// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ClubsProvider } from './contexts/ClubContext.jsx';
import './assets/css/reset.css';
import './assets/css/variables.css';
import './assets/css/base.css';
import Fonts from './styles/fonts.jsx';


const App = () => {
  return (
    <Router>
            <Fonts />
      <AuthProvider>
        <ClubsProvider>
          <div className="app-container">
            <AppRouter />
          </div>
        </ClubsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;