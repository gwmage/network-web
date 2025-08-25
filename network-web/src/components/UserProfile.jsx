```typescript
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ profile }) => {
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
        <h2 className="profile-name">{profile.name}</h2>
      </div>
      <div className="profile-details">
        <p className="profile-bio">{profile.bio}</p>
        {/* Add other profile details */}
      </div>
    </div>
  );
};

export default UserProfile;
```

```css
/* network-web/src/components/UserProfile.css */
.user-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box; /* Include padding in element's total width and height */
}

.profile-header {
  display: flex;
  flex-direction: column; /* Stack image and name vertically on smaller screens */
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
}

.profile-details {
  text-align: center; /* Center text within the details section */
}

.profile-bio {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}


@media (min-width: 768px) {  /* Example media query for larger screens */
  .profile-header {
    flex-direction: row; /* Display image and name side-by-side */
    align-items: flex-start; /* Align items to the top */
  }

  .profile-picture {
    margin-right: 20px; /* Add spacing between image and name */
    margin-bottom: 0; /* Remove bottom margin added for smaller screens */
  }

  .profile-details {
    text-align: left; /* Align text to the left on larger screens */
  }
}

```
