import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const CreateEvent = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    event_type: 'public',
    club: ''
  });
  
  const [clubs, setClubs] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingClubs, setLoadingClubs] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      if (currentUser.role !== 'coordinator') return;
      
      try {
        const response = await api.get('/api/clubs/');
        // Filter active clubs and ones where the user is the coordinator
        const userClubs = response.data.filter(
          club => club.status === 'active' && club.coordinator === currentUser.id
        );
        setClubs(userClubs);
      } catch (err) {
        console.error('Error fetching clubs:', err);
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchClubs();
  }, [currentUser]);

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
    
    // Required fields
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.start_time) newErrors.start_time = 'Start time is required';
    if (!formData.end_time) newErrors.end_time = 'End time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.event_type) newErrors.event_type = 'Event type is required';
    if (!formData.club) newErrors.club = 'Club is required';
    
    // Validate dates
    const startTime = new Date(formData.start_time);
    const endTime = new Date(formData.end_time);
    const now = new Date();
    
    if (startTime < now) {
      newErrors.start_time = 'Start time cannot be in the past';
    }
    
    if (endTime <= startTime) {
      newErrors.end_time = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const eventData = {
        ...formData,
        club: parseInt(formData.club),
        created_by: currentUser.id,
        status: 'upcoming'
      };
      
      await api.post('/api/events/', eventData);
      
      navigate('/events', { 
        state: { message: 'Event created successfully!' }
      });
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.response?.data?.detail || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only coordinators can create events
  if (currentUser.role !== 'coordinator') {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">Only coordinators can create events.</p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  // Check if user has any clubs
  if (!loadingClubs && clubs.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Clubs</h2>
        <p className="text-gray-600 mb-6">
          You need to have an active club before you can create events.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="primary" onClick={() => navigate('/clubs/create')}>
            Create a Club
          </Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create a New Event</h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to create a new event for your club.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              error={errors.title}
              placeholder="Enter the title of your event"
              className="md:col-span-2"
            />

            <FormSelect
              label="Club"
              name="club"
              options={clubs.map(club => ({ value: club.id.toString(), label: club.name }))}
              value={formData.club}
              onChange={handleChange}
              required
              error={errors.club}
              placeholder="Select a club"
            />

            <FormSelect
              label="Event Type"
              name="event_type"
              options={[
                { value: 'public', label: 'Public' },
                { value: 'private', label: 'Private' }
              ]}
              value={formData.event_type}
              onChange={handleChange}
              required
              error={errors.event_type}
            />

            <FormInput
              label="Start Date & Time"
              name="start_time"
              type="datetime-local"
              value={formData.start_time}
              onChange={handleChange}
              required
              error={errors.start_time}
            />

            <FormInput
              label="End Date & Time"
              name="end_time"
              type="datetime-local"
              value={formData.end_time}
              onChange={handleChange}
              required
              error={errors.end_time}
            />

            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              error={errors.location}
              placeholder="Enter the event location"
              className="md:col-span-2"
            />

            <div className="mb-4 md:col-span-2">
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
                placeholder="Provide a detailed description of the event"
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.description ? 'border-red-500' : 'border-gray-300'}
                `}
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => navigate('/events')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateEvent;
