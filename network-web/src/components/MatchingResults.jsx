```typescript
import React, { useState, useEffect } from 'react';
import './MatchingResults.css'; // Create this CSS file for styling
import axios from 'axios';

const MatchingResults = () => {
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/groups/my-group'); // Replace with your API endpoint
        setGroup(groupResponse.data);

        const userResponse = await axios.get('/api/users/me'); // Replace with your API endpoint
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching matching results:", error);
        // Handle error, e.g., display an error message
      }
    };

    fetchMatchingResults();
  }, []);

  if (!group || !user) {
    return <div>Loading matching results...</div>;
  }

  const sharedInterests = (member) => {
    if (!user.interests || !member.interests) return []; // Handle cases where interests are undefined

    const userInterests = user.interests.split(','); // Assuming interests are stored as comma-separated strings
    const memberInterests = member.interests.split(',');
    return userInterests.filter(interest => memberInterests.includes(interest));
  };


  return (
    <div className="matching-results">
      <h2>Your Group</h2>
      <div>
        {group.members.map(member => (
          <div key={member.id} className="member-card">
            <h3>{member.name}</h3>
            {/* Conditionally render shared interests */}
            {sharedInterests(member).length > 0 && (
              <div className="shared-interests">
                <h4>Shared Interests:</h4>
                <ul>
                  {sharedInterests(member).map(interest => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default MatchingResults;
```