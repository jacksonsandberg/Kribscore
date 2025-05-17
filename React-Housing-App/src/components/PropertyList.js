// src/components/PropertyList.js
import React from 'react';

function PropertyList({ properties }) {
  return (
    <div>
      {properties.map((property) => (
        <div key={property.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{property.name}</h3>
          <p>{property.address}</p>
          <p>{property.rent}</p>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
