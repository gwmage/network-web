```typescript
import React, { useState, useEffect } from 'react';
import './MatchingResults.css';
import axios from 'axios';
import { ShareSocial } from 'react-share-social'
import ErrorDisplay from './ErrorDisplay';
import { toast } from 'react-toastify'; // Import toast for notifications

const MatchingResults = () => {
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/groups/my-group');
        setGroup(groupResponse.data);

        const userResponse = await axios.get('/api/users/me');
        setUser(userResponse.data);

        toast.success("Matching successful!"); // Display success toast
      } catch (error) {
        console.error("Error fetching matching results:", error);
        setError("Failed to fetch matching results. Please try again later.");
        toast.error("Matching failed. Please try again later."); // Display error toast
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchMatchingResults();
  }, []);



  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (loading) {
    return <div>Loading matching results...</div>; // Display loading message
  }


  if (!group || !user) {
    return <div>No matching results found.</div>;
  }

  const sharedInterests = group.participants.filter(participant => participant.id !== user.id)
    .flatMap(participant => participant.interests)
    .filter(interest => user.interests.includes(interest));

  const socialMediaUrl = window.location.href;


  return (
    <div className="matching-results">
      <h2>Your Matched Group</h2>
      {/* ... rest of the component JSX */}
    </div>
  );
};

export default MatchingResults;

```