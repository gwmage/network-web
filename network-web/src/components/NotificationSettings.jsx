```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const NotificationSettings = () => {
  const [notificationMethod, setNotificationMethod] = useState('none'); // 'none', 'push', 'email'
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const settings = await api.getNotificationPreferences();
        setNotificationsEnabled(settings.push_enabled || settings.email_enabled);
        if (settings.push_enabled) {
          setNotificationMethod('push');
        } else if (settings.email_enabled) {
          setNotificationMethod('email');
        }
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
        push_enabled: notificationMethod === 'push' && notificationsEnabled,
        email_enabled: notificationMethod === 'email' && notificationsEnabled,
      });
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
          checked={notificationsEnabled}
          onChange={(e) => setNotificationsEnabled(e.target.checked)}
        />
        Enable Notifications
      </label>
      <br />
      <select value={notificationMethod} onChange={(e) => setNotificationMethod(e.target.value)} disabled={!notificationsEnabled}>
        <option value="none">None</option>
        <option value="push">Push Notifications</option>
        <option value="email">Email Notifications</option>
      </select>
      <br />
      <button onClick={handleSaveSettings} disabled={loading}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;

```