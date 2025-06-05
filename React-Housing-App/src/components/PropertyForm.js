// src/components/PropertyForm.js
import React, { useState, useEffect } from 'react';
import './PropertyForm.css';

function PropertyForm({ property, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    gender: '',
    rating: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        address: property.address || '',
        price: property.price || '',
        gender: property.gender || '',
        rating: property.rating || ''
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
    const parsedData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating)
    };
    onSubmit(parsedData);
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
          <label htmlFor="price">Rent (Monthly)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1–5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

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
