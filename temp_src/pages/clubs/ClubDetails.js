import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ClubDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [coordinator, setCoordinator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [userMembership, setUserMembership] = useState(null);
  const [joinRequestSent, setJoinRequestSent] = useState(false);

  useEffect(() => {
    const fetchClubDetails = async () => {
      setLoading(true);
      try {
        // Fetch club details
        const [clubRes, membersRes, eventsRes, coordinatorRes] = await Promise.all([
          api.get(`/api/clubs/${id}/`),
          api.get(`/api/clubs/${id}/members/`),
          api.get(`/api/clubs/${id}/events/`),
          api.get(`/api/clubs/${id}/coordinator/`)
        ]);

        setClub(clubRes.data);
        setMembers(membersRes.data);
        setEvents(eventsRes.data);
        setCoordinator(coordinatorRes.data);

        // If the user is a member, check if they are a member of this club
        if (currentUser.role === 'member') {
          try {
            const membershipRes = await api.get('/api/memberships/');
            const membership = membershipRes.data.find(m => m.club === parseInt(id) && m.user === currentUser.id);
            setUserMembership(membership);
          } catch (err) {
            console.error('Error fetching user membership:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching club details:', err);
        setError(err.response?.data?.detail || 'Error fetching club details');
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id, currentUser]);

  const handleJoinClub = async () => {
    try {
      await api.post('/api/memberships/', {
        club: parseInt(id),
        user: currentUser.id,
      });
      setJoinRequestSent(true);
    } catch (err) {
      console.error('Error joining club:', err);
    }
  };

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

  if (!club) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Club not found</h2>
        <Link to="/clubs">
          <Button variant="primary">Back to Clubs</Button>
        </Link>
      </div>
    );
  }

  const isCoordinator = currentUser.id === club.coordinator;
  const canJoin = currentUser.role === 'member' && !userMembership && !joinRequestSent;
  const isPendingMember = userMembership && userMembership.status === 'pending';
  const isMember = userMembership && userMembership.status === 'active';

  return (
    <div>
      {/* Club Header */}
      <div className="bg-blue-800 text-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center mb-4">
              <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mr-2 ${
                club.status === 'active' ? 'bg-green-500 text-white' : 
                club.status === 'pending' ? 'bg-yellow-400 text-gray-800' : 
                'bg-gray-500 text-white'
              }`}>
                {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
              </span>
              <span className="text-sm opacity-70">Created: {new Date(club.created_at).toLocaleDateString()}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
            <p className="text-lg opacity-80 mb-4">
              Coordinator: {coordinator ? `${coordinator.first_name} ${coordinator.last_name}` : 'Not assigned'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            {isCoordinator && (
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-800"
                onClick={() => navigate(`/clubs/${id}/edit`)}
              >
                Manage Club
              </Button>
            )}
            
            {canJoin && (
              <Button 
                variant="primary" 
                className="bg-white text-blue-800 hover:bg-gray-100"
                onClick={handleJoinClub}
              >
                Join Club
              </Button>
            )}
            
            {isPendingMember && (
              <Button 
                variant="secondary" 
                disabled
              >
                Request Pending
              </Button>
            )}
            
            {isMember && (
              <Button 
                variant="secondary" 
                className="bg-green-500 text-white hover:bg-green-600"
                disabled
              >
                Member
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b">
          <ul className="flex">
            <li 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'about' ? 'border-b-2 border-blue-500 font-medium text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </li>
            <li 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'events' ? 'border-b-2 border-blue-500 font-medium text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </li>
            <li 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'members' ? 'border-b-2 border-blue-500 font-medium text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('members')}
            >
              Members
            </li>
          </ul>
        </div>

        <div className="p-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">About the Club</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">{club.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-2">Club Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{club.status.charAt(0).toUpperCase() + club.status.slice(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{new Date(club.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coordinator</p>
                    <p className="font-medium">
                      {coordinator ? `${coordinator.first_name} ${coordinator.last_name}` : 'Not assigned'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Members</p>
                    <p className="font-medium">{members.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Club Events</h2>
                {isCoordinator && (
                  <Link to="/events/create">
                    <Button variant="primary" size="sm">Create Event</Button>
                  </Link>
                )}
              </div>
              
              {events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No events found for this club.</p>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-gray-100 p-4 flex flex-col justify-center items-center">
                          <div className="text-2xl font-bold">{new Date(event.start_time).getDate()}</div>
                          <div className="text-gray-600">{new Date(event.start_time).toLocaleString('default', { month: 'short' })}</div>
                          <div className="text-sm mt-2">{new Date(event.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                              <p className="text-gray-600 mb-2">
                                <span className="inline-block mr-3">
                                  <i className="fas fa-map-marker-alt mr-1"></i> {event.location}
                                </span>
                                <span className="inline-block">
                                  <i className="fas fa-clock mr-1"></i> {new Date(event.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} (end)
                                </span>
                              </p>
                            </div>
                            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                              event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                              event.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {event.description.length > 120 
                              ? `${event.description.substring(0, 120)}...` 
                              : event.description}
                          </p>
                          <div className="mt-4">
                            <Link to={`/events/${event.id}`}>
                              <Button variant="outline" size="sm">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Club Members</h2>
              
              {members.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No members in this club yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.map(member => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{member.first_name} {member.last_name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Member</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* This would need to come from membership data */}
                            -
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
