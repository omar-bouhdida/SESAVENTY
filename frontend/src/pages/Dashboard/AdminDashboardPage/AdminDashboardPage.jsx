import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {currentUser?.name}</p>
      <div className="admin-sections">
        <section className="pending-approvals">
          <h3>Pending Approvals</h3>
          {/* Approval list will go here */}
        </section>
        <section className="user-management">
          <h3>User Management</h3>
          {/* User management will go here */}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboardPage;