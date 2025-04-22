// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'; // Optional styling

const MainLayout = () => {
  return (
    <div className="app-container">
      {/* Navbar that will appear on all pages */}
      <header className="home-header">
        <div className="logo-group">
          <img
            src="https://storage.googleapis.com/a1aa/image/bfd0ef7b-f92c-483b-450b-fc1aefd75f89.jpg"
            alt="White rounded diamond shape logo"
            className="logo-img"
            width="32"
            height="32"
          />
          {/* Other logo images */}
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/clubs">Clubs</a>
          <div className="dropdown">
            <button>
              <span>Events</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="/events/upcoming">Upcoming</a>
              <a href="/events/past">Past Events</a>
            </div>
          </div>
          <a href="/pages">Pages</a>
        </nav>
        <div className="header-buttons">
          <button className="gradient-btn">Become a member</button>
          <button className="gradient-btn">Add a club</button>
        </div>
      </header>

      {/* This renders the current page's content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;