import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import FormInput from '../../components/ui/FormInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const CreateClub = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    club_name: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.club_name) newErrors.club_name = 'Club name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await api.post('/api/clubs/requests/', {
        club_name: formData.club_name,
        description: formData.description,
        coordinator: currentUser.id
      });
      
      navigate('/dashboard', { 
        state: { message: 'Club creation request submitted successfully! It will be reviewed by a Student Life Officer.' }
      });
    } catch (err) {
      console.error('Error creating club:', err);
      setError(err.response?.data?.detail || 'Failed to create club. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only coordinators can create clubs
  if (currentUser.role !== 'coordinator') {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">Only coordinators can create clubs.</p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create a New Club</h1>
          <p className="text-gray-600 mt-2">
            Submit a request to create a new club. Your request will be reviewed by a Student Life Officer.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Club Name"
            name="club_name"
            value={formData.club_name}
            onChange={handleChange}
            required
            error={errors.club_name}
            placeholder="Enter the name of your club"
          />

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide a detailed description of the club, its purpose, and activities"
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
              `}
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => navigate('/clubs')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateClub;
