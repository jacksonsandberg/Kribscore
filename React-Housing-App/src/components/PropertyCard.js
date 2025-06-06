import React from 'react';

function PropertyCard(props) {
  const { title, address, rent } = props;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '400px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>{title}</h2>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Rent:</strong> {rent}</p>
    </div>
  );
}

export default PropertyCard;
