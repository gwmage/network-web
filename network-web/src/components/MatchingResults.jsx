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
        setNotificationStatus(response.data); // Update state with the complete response data
      } catch (error) {
        setError(error);
        console.error("Error fetching notification status:", error); // Log the error for debugging
      }
    };

    fetchNotificationStatus();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message if any
  }

  // Conditionally render based on notification status
  if (notificationStatus) {
    return (
      <div>
        {/* Access specific properties from the response data */}
        <p>Push Notifications: {notificationStatus.push_enabled ? "Enabled" : "Disabled"}</p>
        <p>Email Notifications: {notificationStatus.email_enabled ? "Enabled" : "Disabled"}</p>
      </div>
    );
  } else {
    return <div>Loading notification status...</div>; // Display loading message while fetching data
  }
};

export default MatchingResultNotifications;
```