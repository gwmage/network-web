import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const UserProfile = () => {
  // ... (existing code)

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
        setStatusLoading(true);
        setStatusError(null);
        const status = await api.getNotificationDeliveryStatus();
        setNotificationStatus(status);
      } catch (error) {
        console.error('Error fetching notification status:', error);
        setStatusError('Failed to fetch notification status.');
      } finally {
        setStatusLoading(false);
      }
    };

    fetchNotificationStatus();
  }, []);

  // ... (rest of the code)

  return (
    <div>
      {/* ... other JSX */}

      <h3>Notification Status</h3>
      {statusLoading ? (
        <p>Loading notification status...</p>
      ) : statusError ? (
        <p className="error-message">Error: {statusError}</p>
      ) : (
        <pre>{JSON.stringify(notificationStatus, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserProfile;