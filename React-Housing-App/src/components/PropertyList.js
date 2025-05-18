// src/components/PropertyList.js
import React from 'react';
import './PropertyList.css'; // Assume you have this

function PropertyList({ properties, onEdit, onDelete }) {
  return (
    <div className="property-list">
      {properties.length === 0 ? (
        <p className="no-properties">No properties available.</p>
      ) : (
        properties.map(property => (
          <div key={property.id} className="property-card">
            <h3>{property.name}</h3>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Rent:</strong> {property.rent}</p>
            {/* Add any other property details here */}
            
            <div className="property-actions">
              <button 
                onClick={() => onEdit(property)} 
                className="edit-btn"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this property?')) {
                    onDelete(property.id);
                  }
                }} 
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PropertyList;