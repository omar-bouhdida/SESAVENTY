import React, { useState } from 'react';
import { useClubs } from '../../../contexts/ClubContext';
import './ClubCreationPage.css';

const ClubCreationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });
  const { addClub } = useClubs();

  const handleSubmit = (e) => {
    e.preventDefault();
    addClub(formData);
  };

  return (
    <div className="club-creation">
      <h2>Create New Club</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Club Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Sports">Sports</option>
          <option value="Arts">Arts</option>
          <option value="Social">Social</option>
        </select>
        <button type="submit">Submit for Approval</button>
      </form>
    </div>
  );
};

export default ClubCreationPage;