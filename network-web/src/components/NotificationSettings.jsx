```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const NotificationSettings = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const settings = await api.getNotificationPreferences();
        setEmailNotifications(settings.email);
        setPushNotifications(settings.push);
      } catch (err) {
        console.error("Error fetching notification settings:", err);
        setError("Failed to load notification settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.updateNotificationPreferences({
        push: pushNotifications,
        email: emailNotifications,
      });
      // Update UI state immediately after successful save
      alert('Notification settings saved!');
    } catch (err) {
      console.error("Error saving notification settings:", err);
      setError("Failed to save notification settings.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Notification Settings</h2>
      <label>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
        />
        Email Notifications
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={pushNotifications}
          onChange={(e) => setPushNotifications(e.target.checked)}
        />
        Push Notifications
      </label>
      <br />
      <button onClick={handleSaveSettings} disabled={loading}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;

```