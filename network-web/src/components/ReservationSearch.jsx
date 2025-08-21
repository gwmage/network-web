```typescript
import React, { useState } from 'react';

const ReservationSearch = () => {
  const [groupSize, setGroupSize] = useState(1);
  const [preferences, setPreferences] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for reservations:', { groupSize, preferences });
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
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default ReservationSearch;
```