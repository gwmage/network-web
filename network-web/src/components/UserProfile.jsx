```typescript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationSettings from './NotificationSettings'; // Import the component

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    // ... other profile fields
  });

  useEffect(() => {
    // Fetch user profile data
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
        />
        {/* ... other profile input fields */}

        <button type="submit">Save Profile</button>
      </form>

      <NotificationSettings /> {/* Render the NotificationSettings component */}
    </div>
  );
};

export default UserProfile;
```