```typescript
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './ProfileManagement.css'; // Create this file for specific styles

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    // ... other profile fields
  });

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., API call
    console.log(profile);
  };

  return (
    <div className="form-container"> {/* Use existing class */}
      <h2 className="form-title">Profile Management</h2>
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
      <Link to="/notification-settings">Notification Settings</Link> {/* Add the link */}
    </div>
  );
};

export default ProfileManagement;

```