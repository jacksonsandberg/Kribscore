// src/components/PropertyDetail.js
import React from 'react';
import './PropertyDetail.css';

function PropertyDetail({ property, onClose }) {
  if (!property) return null;

  return (
    <div className="property-detail-overlay" onClick={onClose}>
      <div
        className="property-detail"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>{property.name}</h2>
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>Rent:</strong> {property.rent}</p>
        {property.gender && <p><strong>Gender Housing:</strong> {property.gender}</p>}
        {property.rating && <p><strong>Rating:</strong> {property.rating} / 5</p>}
        {property.description && <p><strong>Description:</strong> {property.description}</p>}

        {property.images && property.images.length > 0 && (
          <div className="property-images">
            {property.images.map((url, i) => (
              <img key={i} src={url} alt={`Property ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetail;
