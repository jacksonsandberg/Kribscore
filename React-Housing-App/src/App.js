// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import Login from './components/login';
import Filters from './components/Filters';
import PropertyDetail from './components/PropertyDetail';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [filters, setFilters] = useState({
    gender: '',
    maxPrice: '',
    minRating: '',
  });

  const API_URL = 'https://kribscore.onrender.com/api/properties';

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchProperties();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsFormVisible(false);
    setCurrentProperty(null);
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Server responded with an error');
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load properties. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const genderMatch = filters.gender
      ? property.gender?.trim().toLowerCase() === filters.gender.trim().toLowerCase()
      : true;
  
    const priceMatch = filters.maxPrice
      ? Number(property.rent) <= Number(filters.maxPrice)
      : true;
  
    const ratingMatch = filters.minRating
      ? Number(property.rating) >= Number(filters.minRating)
      : true;
  
    return genderMatch && priceMatch && ratingMatch;
  });
  

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const handleAddProperty = async (propertyData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) throw new Error('Failed to add property');
      fetchProperties();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    }
  };

  const handleUpdateProperty = async (propertyData) => {
    try {
      const response = await fetch(`${API_URL}/${currentProperty.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) throw new Error('Failed to update property');
      fetchProperties();
      setIsFormVisible(false);
      setCurrentProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error('Failed to delete property');
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  const handleEditProperty = (property) => {
    setCurrentProperty(property);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentProperty) {
      handleUpdateProperty(formData);
    } else {
      handleAddProperty(formData);
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setCurrentProperty(null);
  };

  if (loading) return <div className="loading">Loading properties...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="app-header">
        <h1>BYU-Hawaii Student Housing</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isLoggedIn ? (
            <>
              <button
                className="add-property-btn"
                onClick={() => {
                  setCurrentProperty(null);
                  setIsFormVisible(true);
                }}
              >
                Add New Property
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </header>

      <Filters filters={filters} onChange={setFilters} />

      {isLoggedIn && (
        <div
          style={{
            backgroundColor: '#f0f0f0',
            color: '#333',
            padding: '10px',
            textAlign: 'center',
            borderBottom: '1px solid #ccc',
          }}
        >
          You’re logged in as an <strong>admin</strong>. You can add, edit, and delete properties.
        </div>
      )}

      {isFormVisible && isLoggedIn ? (
        <PropertyForm
          property={currentProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          <PropertyList
            properties={filteredProperties}
            onEdit={isLoggedIn ? handleEditProperty : null}
            onDelete={isLoggedIn ? handleDeleteProperty : null}
            onSelect={setSelectedProperty}
          />

          {selectedProperty && (
            <PropertyDetail
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
