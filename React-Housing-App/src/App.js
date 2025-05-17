// src/App.js
import React from 'react';
import './App.css';
import PropertyList from './components/PropertyList';

function App() {
  // Temporary hardcoded data
  const properties = [
    { id: 1, name: "Laie Hale", address: "55-123 Kulanui St", rent: "$650/month" },
    { id: 2, name: "Hauula House", address: "54-321 Hana St", rent: "$700/month" },
  ];

  return (
    <div className="App">
      <h1>BYU-Hawaii Student Housing</h1>
      <PropertyList properties={properties} />
    </div>
  );
}

export default App;
