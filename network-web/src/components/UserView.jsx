```typescript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';

const UserView = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getUser(userId);
        const activityData = await api.getUserActivity(userId);
        setUser(userData);
        setActivity(activityData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {/* Display other user details as needed */}
      <h3>Activity History</h3>
      <ul>
        {activity.map((item) => (
          <li key={item.timestamp}>
            {item.timestamp} - {item.action} 
            {/* Display other activity details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
```