import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../../assets/images/icon.png';
import img4 from '../../../assets/images/img4.jpeg';
import './RegisterPage.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ClubMember'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <header className="register-header">
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
              <Link to="/login">Sign In</Link>
              <Link to="/register" className="active">Sign Up</Link>
            </nav>
          </header>

          <main className="register-main">
            <div className="welcome-section">
              <h1 className="welcome-text">Welcome!</h1>
              <p className="welcome-subtext">Create an account to discover amazing events</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fas fa-user" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fas fa-envelope" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <i className="fas fa-lock" />
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button type="button" className="password-toggle">
                    <i className="fas fa-eye" />
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
                <i className="fas fa-arrow-right" />
              </button>
            </form>
          </main>
          <footer className="login-footer">
            Already have an account? <Link to="/Login">Sign In</Link>
          </footer>
        </div>

        <div className="register-right">
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

export default RegisterForm;
