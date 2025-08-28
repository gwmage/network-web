```typescript
import React, { useState } from 'react';
import * as api from '../utils/api';

const ReservationSearch = () => {
  const [groupSize, setGroupSize] = useState(1);
  const [preferences, setPreferences] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await api.searchRestaurants({ groupSize, preferences });
      setSearchResults(results);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Find a Table</h2>
      <div>
        <label htmlFor="groupSize">Group Size:</label>
        <input
          type="number"
          id="groupSize"
          value={groupSize}
          onChange={(e) => setGroupSize(parseInt(e.target.value, 10))}
          min="1"
        />
      </div>
      <div>
        <label htmlFor="preferences">Preferences:</label>
        <input
          type="text"
          id="preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
      </div>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <div>Error: {error.message}</div>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((restaurant) => (
            <li key={restaurant.id}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
};

export default ReservationSearch;

```