```jsx
import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Handle error, e.g., display an error message
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Settings updated:', data);
      // Optionally, display a success message
    } catch (error) {
      console.error('Error updating settings:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div>
      <h2>System Settings</h2>
      <form onSubmit={handleSubmit}>
        {/* Example setting fields */}
        <label htmlFor="setting1">Setting 1:</label>
        <input
          type="text"
          id="setting1"
          name="setting1"
          value={settings.setting1 || ''}
          onChange={handleSettingChange}
        />
        <br />
        {/* Add more setting fields as needed */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminSettings;
```