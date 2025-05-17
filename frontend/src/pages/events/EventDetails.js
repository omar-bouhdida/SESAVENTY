import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const EventDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        // Fetch event details
        const eventRes = await api.get(`/api/events/${id}/`);
        setEvent(eventRes.data);
        
        // Check if the user is the creator
        setIsCreator(eventRes.data.created_by === currentUser.id);
        
        // Fetch club details
        if (eventRes.data.club) {
          const clubRes = await api.get(`/api/clubs/${eventRes.data.club}/`);
          setClub(clubRes.data);
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError(err.response?.data?.detail || 'Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, currentUser.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
        <Link to="/events">
          <Button variant="primary">Back to Events</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div>
      {/* Event Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-blue-700 text-white p-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                  event.event_type === 'public' ? 'bg-blue-50 text-blue-800' : 'bg-purple-50 text-purple-800'
                }`}>
                  {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              {club && (
                <p className="text-blue-200 mb-2">
                  Organized by: <Link to={`/clubs/${club.id}`} className="underline hover:text-white">{club.name}</Link>
                </p>
              )}
            </div>
            
            {isCreator && (
              <div className="mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-700"
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit Event
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Date & Time</h3>
              <p className="font-medium">{formatDate(event.start_time)}</p>
              <p className="text-gray-600">
                {formatTime(event.start_time)} - {formatTime(event.end_time)}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <p className="font-medium">{event.location}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2">Status</h3>
              <p className="font-medium">
                <span className={`inline-block px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Event Description</h2>
            <div className="bg-white border border-gray-200 rounded-md p-4">
              <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="primary" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </div>
      </div>
      
      {/* Event information, attendees, etc. could be added here */}
    </div>
  );
};

export default EventDetails;
