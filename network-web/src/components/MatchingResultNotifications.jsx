```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchingResultNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/matching/notifications'); // Replace with your actual API endpoint
        setNotifications(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNotifications();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!notifications) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Matching Result Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {/* Display notification details */}
              {notification.message} 
              {/* Example: Add other details like timestamp, type, etc. */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchingResultNotifications;
```