// File: network-web/src/components/MatchingResultNotifications.jsx
import React, { useState, useEffect } from 'react';

const MatchingResultNotifications = () => {
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        const response = await fetch('/api/notifications/status'); // Ensure correct API endpoint
        if (!response.ok) {
          const errorData = await response.json(); // Get error details from the response
          throw new Error(errorData.message || 'Failed to fetch notification status'); // Throw error with message from API
        }
        const data = await response.json();
        setNotificationStatus(data.status);
      } catch (err) {
        console.error("Error fetching notification status:", JSON.stringify(err, null, 2)); // Log the full error object
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