import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the passed keyword
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation(); // Get the state passed from LandingPage
  const { keyword } = location.state || {}; // Extract the keyword from state
  const [leads, setLeads] = useState([]); // To store the lead data

  useEffect(() => {
    if (keyword) {
      // Fetch leads based on the keyword (this will connect to your backend)
      fetchLeads(keyword);
    }
  }, [keyword]);

  // Placeholder function to simulate fetching data
  const fetchLeads = async (searchKeyword) => {
    try {
      const response = await fetch(`/api/leads?keyword=${searchKeyword}`);
      const data = await response.json(); // Convert the response to JSON
  
      setLeads(data); // Set the leads to the data we get from the API
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };
  

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      <table>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
