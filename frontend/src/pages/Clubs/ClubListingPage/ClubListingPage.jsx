import React from 'react';
import { useClubs } from '../../../contexts/ClubContext';
import './ClubListingPage.css';

const ClubListingPage = () => {
  const { clubs } = useClubs();

  return (
    <div className="club-listing">
      <h2>All Clubs</h2>
      <div className="club-grid">
        {clubs.map(club => (
          <div key={club.id} className="club-card">
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubListingPage;