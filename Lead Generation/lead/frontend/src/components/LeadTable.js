import React from 'react';

const LeadTable = ({ leads }) => {
  if (!leads.length) {
    return <p>No leads found.</p>;
  }

  return (
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
            <td>
              <a href={lead.website} target="_blank" rel="noopener noreferrer">
                {lead.website}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;
