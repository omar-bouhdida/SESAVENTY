import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [popularClubs, setPopularClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Only fetch if not authenticated
        if (!isAuthenticated) {
          const [eventsRes, clubsRes] = await Promise.all([
            api.get('/api/events/'),
            api.get('/api/clubs/')
          ]);
          
          // Get 3 upcoming events for featured section
          const upcomingEvents = eventsRes.data
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
            .slice(0, 3);
          
          setFeaturedEvents(upcomingEvents);
          
          // Get 3 active clubs for popular section
          const activeClubs = clubsRes.data
            .filter(club => club.status === 'active')
            .slice(0, 3);
          
          setPopularClubs(activeClubs);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [isAuthenticated]);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to SESAVENTY</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            The ultimate platform to manage and participate in student clubs and events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isAuthenticated && (
              <>
                <Link to="/register">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800 text-lg py-3 px-8">
                    Join Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" className="text-blue-800 text-lg py-3 px-8">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button variant="secondary" className="text-blue-800 text-lg py-3 px-8">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Join Clubs</h3>
              <p className="text-gray-600">
                Discover and join a variety of student clubs that match your interests and passions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Attend Events</h3>
              <p className="text-gray-600">
                Stay up-to-date with upcoming events and participate in exciting activities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fas fa-flag"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Clubs</h3>
              <p className="text-gray-600">
                Have a great idea? Create your own club and recruit members to join your cause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events" className="text-blue-600 hover:text-blue-800">View all events →</Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden" isHoverable>
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800">{new Date(event.start_time).getDate()}</div>
                      <div className="text-xl text-gray-600">{new Date(event.start_time).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      {new Date(event.start_time).toLocaleDateString()}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {event.description.length > 100 
                        ? `${event.description.substring(0, 100)}...` 
                        : event.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Location: {event.location}</span>
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" size="sm">Details</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No upcoming events at this time. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Clubs Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Popular Clubs</h2>
              <Link to="/clubs" className="text-blue-600 hover:text-blue-800">View all clubs →</Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : popularClubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularClubs.map(club => (
                  <Card key={club.id} className="h-full flex flex-col" isHoverable>
                    <h3 className="text-xl font-semibold mb-3">{club.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {club.description.length > 150 
                        ? `${club.description.substring(0, 150)}...` 
                        : club.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link to={`/clubs/${club.id}`}>
                        <Button variant="outline" className="w-full">View Club</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No clubs available at this time. Check back later!</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join SESAVENTY today and be part of an active community of students.
            </p>
            <Link to="/register">
              <Button variant="primary" className="bg-white text-blue-900 hover:bg-gray-100 text-lg py-3 px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
