```typescript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationSettings from './NotificationSettings';
import * as api from '../utils/api'; // Import API functions

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    // ... other profile fields
  });
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState(null);


  useEffect(() => {
    // Fetch user profile data
  }, []);

  useEffect(() => {
    const fetchNotificationStatus = async () => {
      try {
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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* ... existing form elements */}
      </form>

      <NotificationSettings />

      <h3>Notification Status</h3>
      {statusLoading ? (
        <p>Loading notification status...</p>
      ) : statusError ? (
        <p>Error: {statusError}</p>
      ) : (
        <pre>{JSON.stringify(notificationStatus, null, 2)}</pre>
      )}
    </div>
  );
};

export default UserProfile;
```