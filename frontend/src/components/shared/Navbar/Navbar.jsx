// src/components/shared/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import icon from '../../../assets/images/icon.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={icon}
          alt="White rounded diamond shape logo"
          className="logo-img"
          width="32"
          height="32"
        />
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/about" className="navbar-item">About</Link>
        <Link to="/clubs" className="navbar-item">Clubs</Link>
        <Link to="/events" className="navbar-item">Events</Link>
      </div>
      <div className="navbar-actions">
        <Link to="/login" className="navbar-button">Sign In</Link>
        <Link to="/signup" className="navbar-button">Sign Up</Link>
      </div>
    </nav>
  );
}
export default Navbar;