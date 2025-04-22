import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './CoordinatorDashboardPage.css';

const CoordinatorDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="coordinator-dashboard">
      <h2>Coordinator Dashboard</h2>
      <p>Welcome, {currentUser?.name}</p>
      <div className="coordinator-sections">
        <section className="my-clubs">
          <h3>My Clubs</h3>
          {/* Club management will go here */}
        </section>
        <section className="event-management">
          <h3>Event Management</h3>
          {/* Event management will go here */}
        </section>
      </div>
    </div>
  );
};

export default CoordinatorDashboardPage;