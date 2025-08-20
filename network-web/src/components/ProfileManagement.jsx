```typescript
import React, { useState } from 'react';
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
    </div>
  );
};

export default ProfileManagement;

```

```css
/* network-web/src/components/ProfileManagement.css */
.form-container {
    /* Styles from network-web/src/index.css will be applied */
    /* Add or override specific styles here as needed */
}


@media (max-width: 768px) { /* Example breakpoint */
  .form-container {
    width: 95%; /* Adjust width for smaller screens */
    padding: 15px; /* Adjust padding */
  }
  
  /* Other responsive adjustments as necessary */
  input[type="text"],
  textarea {
    font-size: 16px; /* Adjust font size */
  }

  button {
    font-size: 16px; /* Adjust button font size */
  }
}

```
