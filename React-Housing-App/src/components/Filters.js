// src/components/Filters.js
import React from 'react';

function Filters({ filters, onChange }) {
  return (
    <div className="filters" style={{ marginBottom: '1rem' }}>
      <label>
        Gender:
        <select
          value={filters.gender}
          onChange={(e) => onChange({ ...filters, gender: e.target.value })}
        >
          <option value="">All</option>
          <option value="Boy">Boys Housing</option>
          <option value="Girl">Girls Housing</option>
        </select>
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Max Price:
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: e.target.value })
          }
        />
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Min Rating:
        <select
          value={filters.minRating}
          onChange={(e) =>
            onChange({ ...filters, minRating: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="1">1★</option>
          <option value="2">2★</option>
          <option value="3">3★</option>
          <option value="4">4★</option>
          <option value="5">5★</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;
