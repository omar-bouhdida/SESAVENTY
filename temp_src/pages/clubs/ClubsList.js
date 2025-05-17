import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ClubsList = () => {
  const { currentUser } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/clubs/');
        setClubs(response.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter(club => {
    // Filter by status
    if (filter !== 'all' && club.status !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !club.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !club.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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
          <h1 className="text-3xl font-bold text-gray-800">Clubs</h1>
          <p className="text-gray-600 mt-1">Discover and join student clubs</p>
        </div>
        {currentUser.role === 'coordinator' && (
          <Link to="/clubs/create" className="mt-4 md:mt-0">
            <Button variant="primary">Create New Club</Button>
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
            All Clubs
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'active' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Pending
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search clubs..."
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

      {filteredClubs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No clubs found matching your criteria.</p>
          {currentUser.role === 'coordinator' && (
            <Link to="/clubs/create">
              <Button variant="primary">Create a New Club</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <Card key={club.id} className="h-full flex flex-col" isHoverable>
              <div className="mb-4">
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
                  club.status === 'active' ? 'bg-green-100 text-green-800' : 
                  club.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {club.description.length > 150 
                  ? `${club.description.substring(0, 150)}...` 
                  : club.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Created: {new Date(club.created_at).toLocaleDateString()}
                </span>
                <Link to={`/clubs/${club.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination (simple version) */}
      {filteredClubs.length > 0 && (
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

export default ClubsList;
