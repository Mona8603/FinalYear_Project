// src/components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Ensure this import is correct

const LandingPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/dashboard?search=${searchKeyword}`); // Redirect to Dashboard with search term
    }
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the Lead Generation System</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by industry..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="search-input" // Class for styling
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default LandingPage; // Export the component
