```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchingResultNotifications = () => {
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        const response = await axios.get('/api/matching/notifications'); // Replace with your actual API endpoint
        setNotificationStatus(response.data.status);
      } catch (err) {
        console.error("Error fetching notification status:", err);
        setError("Failed to fetch notification status. Please try again later.");
      }
    };

    fetchNotificationStatus();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (notificationStatus === null) {
    return <div>Loading notification status...</div>;
  }

  return (
    <div>
      Notification Status: {notificationStatus}
    </div>
  );
};

export default MatchingResultNotifications;
```