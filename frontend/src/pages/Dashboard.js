import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [stats, setStats] = useState({
    totalClubs: 0,
    upcomingEvents: 0,
    myMemberships: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch data based on user role
        const [clubsRes, eventsRes] = await Promise.all([
          api.get('/api/clubs/'),
          api.get('/api/events/'),
        ]);

        setClubs(clubsRes.data);
        setEvents(eventsRes.data);

        // If user is a member, fetch their memberships
        if (currentUser.role === 'member') {
          const membershipsResponse = await api.get('/api/memberships/');
          setMemberships(membershipsResponse.data);
          
          // Set dashboard stats
          setStats({
            totalClubs: clubsRes.data.length,
            upcomingEvents: eventsRes.data.filter(event => event.status === 'upcoming').length,
            myMemberships: membershipsResponse.data.length
          });
        } else {
          // Set dashboard stats for non-members
          setStats({
            totalClubs: clubsRes.data.length,
            upcomingEvents: eventsRes.data.filter(event => event.status === 'upcoming').length,
            myMemberships: 0
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {currentUser.first_name || currentUser.username}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-blue-50 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800">Total Clubs</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalClubs}</p>
          <Link to="/clubs" className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block">
            View all clubs →
          </Link>
        </Card>

        <Card className="bg-green-50 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-green-800">Upcoming Events</h3>
          <p className="text-3xl font-bold mt-2">{stats.upcomingEvents}</p>
          <Link to="/events" className="text-green-600 hover:text-green-800 text-sm mt-4 inline-block">
            View all events →
          </Link>
        </Card>

        {currentUser.role === 'member' && (
          <Card className="bg-purple-50 border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800">My Memberships</h3>
            <p className="text-3xl font-bold mt-2">{stats.myMemberships}</p>
            <Link to="/profile" className="text-purple-600 hover:text-purple-800 text-sm mt-4 inline-block">
              View my profile →
            </Link>
          </Card>
        )}

        {currentUser.role === 'coordinator' && (
          <Card className="bg-amber-50 border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold text-amber-800">My Club</h3>
            <p className="text-base mt-2">Manage your club and create events</p>
            <Link to="/clubs/create" className="text-amber-600 hover:text-amber-800 text-sm mt-4 inline-block">
              Create or manage club →
            </Link>
          </Card>
        )}

        {currentUser.role === 'student_life_officer' && (
          <Card className="bg-red-50 border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-red-800">Club Requests</h3>
            <p className="text-base mt-2">Review pending club creation requests</p>
            <Link to="/clubs/requests" className="text-red-600 hover:text-red-800 text-sm mt-4 inline-block">
              View requests →
            </Link>
          </Card>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <ul className="flex">
              <li className="px-6 py-3 cursor-pointer border-b-2 border-blue-500 font-medium text-blue-600">All</li>
              <li className="px-6 py-3 cursor-pointer text-gray-500 hover:text-gray-700">Clubs</li>
              <li className="px-6 py-3 cursor-pointer text-gray-500 hover:text-gray-700">Events</li>
              <li className="px-6 py-3 cursor-pointer text-gray-500 hover:text-gray-700">Memberships</li>
            </ul>
          </div>
          <div className="p-6">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center shrink-0 mr-4">
                    <span className="text-sm">E</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.start_time).toLocaleDateString()} at {new Date(event.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{event.description.substring(0, 100)}...</p>
                    <Link to={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No recent activities found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentUser.role === 'member' && (
            <>
              <Link to="/clubs">
                <Button variant="outline" className="w-full justify-center">
                  Browse Clubs
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" className="w-full justify-center">
                  View Events
                </Button>
              </Link>
            </>
          )}
          
          {currentUser.role === 'coordinator' && (
            <>
              <Link to="/clubs/create">
                <Button variant="outline" className="w-full justify-center">
                  Create Club
                </Button>
              </Link>
              <Link to="/events/create">
                <Button variant="outline" className="w-full justify-center">
                  Create Event
                </Button>
              </Link>
            </>
          )}
          
          {currentUser.role === 'student_life_officer' && (
            <>
              <Link to="/clubs/requests">
                <Button variant="outline" className="w-full justify-center">
                  Review Club Requests
                </Button>
              </Link>
              <Link to="/clubs">
                <Button variant="outline" className="w-full justify-center">
                  Manage Clubs
                </Button>
              </Link>
            </>
          )}
          
          <Link to="/profile">
            <Button variant="outline" className="w-full justify-center">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
