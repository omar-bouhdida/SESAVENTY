import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './MemberDashboardPage.css';

const MemberDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="member-dashboard">
      <h2>Member Dashboard</h2>
      <p>Welcome, {currentUser?.name}</p>
      <div className="member-sections">
        <section className="my-memberships">
          <h3>My Memberships</h3>
          {/* Club memberships will go here */}
        </section>
        <section className="upcoming-events">
          <h3>Upcoming Events</h3>
          {/* Events list will go here */}
        </section>
      </div>
    </div>
  );
};

export default MemberDashboardPage;