import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [loadingMemberships, setLoadingMemberships] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    first_name: currentUser.first_name || '',
    last_name: currentUser.last_name || '',
    email: currentUser.email || '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // If user is a member, fetch their memberships
    if (currentUser.role === 'member') {
      const fetchMemberships = async () => {
        setLoadingMemberships(true);
        try {
          const response = await api.get('/api/memberships/');
          setMemberships(response.data.filter(m => m.user === currentUser.id));
        } catch (err) {
          console.error('Error fetching memberships:', err);
        } finally {
          setLoadingMemberships(false);
        }
      };
      
      fetchMemberships();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Password validation if changing password
      if (formData.password) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          setLoading(false);
          return;
        }
      }
      
      // Prepare update data
      const updateData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email
      };
      
      // Only include password if it's being changed
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      // Update user profile
      await api.patch(`/users/${currentUser.id}/`, updateData);
      
      // Success message
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.detail || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="md:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                
                <FormInput
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
                
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="md:col-span-2"
                />
                
                <FormInput
                  label="New Password (leave blank to keep current)"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                
                <FormInput
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
        
        {/* Account Information */}
        <div>
          <Card>
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">{currentUser.username}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </span>
                </p>
              </div>
            </div>
            
            <Button
              variant="danger"
              className="w-full"
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  logout();
                }
              }}
            >
              Log Out
            </Button>
          </Card>
        </div>
      </div>
      
      {/* Memberships Section (for members) */}
      {currentUser.role === 'member' && (
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">My Club Memberships</h2>
            
            {loadingMemberships ? (
              <div className="flex justify-center items-center h-24">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : memberships.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">You are not a member of any clubs yet.</p>
                <Button variant="primary" onClick={() => window.location.href = '/clubs'}>
                  Browse Clubs
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {memberships.map(membership => (
                      <tr key={membership.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a 
                            href={`/clubs/${membership.club}`} 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {/* This would ideally show the club name, but we'd need to fetch club details */}
                            Club #{membership.club}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {membership.role.charAt(0).toUpperCase() + membership.role.slice(1).replace('_', ' ')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            membership.status === 'active' ? 'bg-green-100 text-green-800' : 
                            membership.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(membership.joined_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
      
      {/* Coordinated Clubs Section (for coordinators) */}
      {currentUser.role === 'coordinator' && (
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">My Coordinated Clubs</h2>
            
            {/* This would show the coordinator's clubs */}
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">Your club management section.</p>
              <Button variant="primary" onClick={() => window.location.href = '/clubs'}>
                Manage Clubs
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
