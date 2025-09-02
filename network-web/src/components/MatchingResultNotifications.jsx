// File: network-web/src/components/MatchingResultNotifications.jsx
import React, { useState, useEffect } from 'react';

const MatchingResultNotifications = () => {
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        const response = await fetch('/api/notifications/status'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotificationStatus(data.status);
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