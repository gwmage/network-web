```typescript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MemberActivityHistory = () => {
  const { userId } = useParams();
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`/admin/users/${userId}/activity`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [userId]);

  if (loading) {
    return <div>Loading activity history...</div>;
  }

  if (error) {
    return <div>Error loading activity history: {error.message}</div>;
  }

  return (
    <div>
      <h2>Activity History for User {userId}</h2>
      <ul>
        {activity.map((item) => (
          <li key={item.id}>
            {item.timestamp} - {item.activityType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberActivityHistory;

```