import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);
  const [region, setRegion] = useState('');
  const [preferences, setPreferences] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await api.getLoggedInUser();
        setUser(userData);
        setRegion(userData.region || '');
        setPreferences(userData.preferences || '');
        setInterests(userData.interests || '');
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const handleSaveProfile = async () => {
    try {
      await api.updateUserProfile({ region, preferences, interests });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error loading profile: {error.message}</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <h3>Edit Profile</h3>
      <label htmlFor="region">Region:</label>
      <input
        type="text"
        id="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <br />
      <label htmlFor="preferences">Preferences:</label>
      <input
        type="text"
        id="preferences"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
      />
      <br />
      <label htmlFor="interests">Interests:</label>
      <input
        type="text"
        id="interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />
      <br />
      <button onClick={handleSaveProfile}>Save Profile</button>


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