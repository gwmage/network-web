```typescript
import React, { useState, useEffect } from 'react';
import './MatchingResults.css';
import axios from 'axios';
import { ShareSocial } from 'react-share-social'
import ErrorDisplay from './ErrorDisplay'; // Import the ErrorDisplay component

const MatchingResults = () => {
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/groups/my-group');
        setGroup(groupResponse.data);

        const userResponse = await axios.get('/api/users/me');
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching matching results:", error);
        setError("Failed to fetch matching results. Please try again later."); // Set error message
      }
    };

    fetchMatchingResults();
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />; // Display error message
  }

  if (!group || !user) {
    return <div>Loading matching results...</div>;
  }

  // ... rest of the component code (sharedInterests, socialMediaUrl, return statement)
```