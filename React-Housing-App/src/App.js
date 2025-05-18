// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  // API URL - make sure this matches your backend
  const API_URL = 'http://localhost:5001/api/properties';

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      
      const data = await response.json();
      setProperties(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load properties. Please try again later.');
      setLoading(false);
    }
  };

  // Load properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  // Add a new property
  const handleAddProperty = async (propertyData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      // Refresh the property list
      fetchProperties();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    }
  };

  // Update an existing property
  const handleUpdateProperty = async (propertyData) => {
    try {
      const response = await fetch(`${API_URL}/${currentProperty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      // Refresh the property list
      fetchProperties();
      setIsFormVisible(false);
      setCurrentProperty(null);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  // Delete a property
  const handleDeleteProperty = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      // Refresh the property list
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  // Edit a property (show form with property data)
  const handleEditProperty = (property) => {
    setCurrentProperty(property);
    setIsFormVisible(true);
  };

  // Form submission handler (determines whether to add or update)
  const handleFormSubmit = (formData) => {
    if (currentProperty) {
      handleUpdateProperty(formData);
    } else {
      handleAddProperty(formData);
    }
  };

  // Cancel form
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
        <button 
          className="add-property-btn" 
          onClick={() => {
            setCurrentProperty(null);
            setIsFormVisible(true);
          }}
        >
          Add New Property
        </button>
      </header>

      {isFormVisible ? (
        <PropertyForm 
          property={currentProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelForm}
        />
      ) : (
        <PropertyList 
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}
    </div>
  );
}

export default App;