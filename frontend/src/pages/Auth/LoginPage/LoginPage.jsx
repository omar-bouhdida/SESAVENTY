import React from 'react';
import './LoginPage.css';
import icon from '../../../assets/images/icon.png';
import img4 from '../../../assets/images/img4.jpeg';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <header className="login-header">
            <div className="logo">
              <img
                src={icon}
                alt="White rounded diamond shape logo"
                className="logo-icon"
                width="32"
                height="32"
              />
              <span className="logo-text">SESAVENTY</span>
            </div>
            <nav className="nav-links">
              <Link to="/Login">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </nav>
          </header>
          <main className="login-main">
            <div className="welcome-section">
              <h1 className="welcome-text">Welcome Back!</h1>
              <p className="welcome-subtext">Sign in to access your account and discover amazing events</p>
            </div>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon"><i className="fas fa-envelope" /></span>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email" 
                    defaultValue="foulen.fouleni@sesame.com.tn" 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon"><i className="fas fa-lock" /></span>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password" 
                    defaultValue="•••••" 
                    required 
                  />
                  <button type="button" className="password-toggle">
                    <i className="fas fa-eye" />
                  </button>
                </div>
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember Me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign In
                <i className="fas fa-arrow-right" />
              </button>
            </form>
          </main>
          <footer className="login-footer">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </footer>
        </div>
        <div className="login-right">
          <div className="image-overlay"></div>
          <img src={img4} alt="Event Crowd" />
          <div className="image-caption">
            <h3>Discover Amazing Events</h3>
            <p>Join thousands of events happening around you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;