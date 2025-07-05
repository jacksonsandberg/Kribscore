import React from 'react';
import './PropertyList.css'; // Make sure this path is correct

function PropertyCard(props) {
  const {
    title,
    address,
    rent,
    gender,
    rating,
    imageUrl,
    onEdit,
    onDelete,
  } = props;

  return (
    <div className="property-card">
      <img
        src={imageUrl || '/images/Hawaiicoolhouse.jpg'}
        alt={title}
        className="property-image"
      />

      <div className="property-content">
        <h3>{title}</h3>

        <p className="property-info">
          {address} • ${rent}/month
        </p>

        <div className="property-tags">
          {gender && <span className="property-tag">{gender}</span>}
          {rating && <span className="property-tag">⭐ {rating}</span>}
        </div>

        <div className="property-actions">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
