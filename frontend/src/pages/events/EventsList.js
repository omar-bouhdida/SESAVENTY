import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const EventsList = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    // Filter by status
    if (filter !== 'all' && event.status !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getEventDateFormatted = (startTime) => {
    const date = new Date(startTime);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Events</h1>
          <p className="text-gray-600 mt-1">Discover and attend events</p>
        </div>
        {currentUser.role === 'coordinator' && (
          <Link to="/events/create" className="mt-4 md:mt-0">
            <Button variant="primary">Create New Event</Button>
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'upcoming' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'completed' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'cancelled' ? 'bg-red-100 text-red-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancelled
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No events found matching your criteria.</p>
          {currentUser.role === 'coordinator' && (
            <Link to="/events/create">
              <Button variant="primary">Create a New Event</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/5 bg-blue-50 p-6 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-blue-800">{new Date(event.start_time).getDate()}</div>
                  <div className="text-blue-600 font-medium">
                    {new Date(event.start_time).toLocaleString('default', { month: 'short' })}
                  </div>
                  <div className="text-sm text-blue-500 mt-2">
                    {new Date(event.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div className="p-6 md:w-4/5">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mr-2 ${
                          event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                          event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                          event.event_type === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">
                        <span className="inline-block mr-4">
                          <i className="fas fa-clock mr-1"></i> {getEventDateFormatted(event.start_time)}
                        </span>
                        <span className="inline-block">
                          <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        {event.description.length > 150 
                          ? `${event.description.substring(0, 150)}...` 
                          : event.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <Link to={`/events/${event.id}`}>
                        <Button variant="primary">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination (simple version) */}
      {filteredEvents.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ml-0 border-l-0">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default EventsList;
