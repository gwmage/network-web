```typescript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationSettings from './NotificationSettings'; // Import the component
import styled from 'styled-components';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  @media (min-width: 768px) {
    width: 500px;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;


const UserProfile = () => {
  // ... (rest of the component code)

  return (
    <UserProfileContainer>
      <h2>User Profile</h2>
      <ProfileForm onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </FormField>

        <FormField>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </FormField>
        {/* ... other profile input fields */}

        <button type="submit">Save Profile</button>
      </ProfileForm>

      <NotificationSettings /> {/* Render the NotificationSettings component */}
    </UserProfileContainer>
  );
};

export default UserProfile;

```
