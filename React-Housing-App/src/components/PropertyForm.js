// src/components/PropertyForm.js
import React, { useState, useEffect } from 'react';
import './PropertyForm.css'; // We'll create this next

function PropertyForm({ property, onSubmit, onCancel }) {
  // Default empty form or use existing property if editing
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rent: '',
    // Add any additional fields you want to include
  });

  // If property is provided, we're editing an existing property
  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        address: property.address || '',
        rent: property.rent || '',
        // Set other fields as needed
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="property-form-container">
      <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rent">Rent</label>
          <input
            type="text"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Add any additional form fields here */}
        
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {property ? 'Update Property' : 'Add Property'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PropertyForm;