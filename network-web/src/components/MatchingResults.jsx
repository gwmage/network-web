```typescript
import React, { useState, useEffect } from 'react';
import './MatchingResults.css';
import axios from 'axios';
import { ShareSocial } from 'react-share-social'

const MatchingResults = () => {
  const [group, setGroup] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/groups/my-group');
        setGroup(groupResponse.data);

        const userResponse = await axios.get('/api/users/me');
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching matching results:", error);
      }
    };

    fetchMatchingResults();
  }, []);

  if (!group || !user) {
    return <div>Loading matching results...</div>;
  }

  const sharedInterests = (member) => {
    if (!user.interests || !member.interests) return [];

    const userInterests = user.interests.split(',');
    const memberInterests = member.interests.split(',');
    return userInterests.filter(interest => memberInterests.includes(interest));
  };

  const socialMediaUrl = 'http://localhost:3000/matching'; // Replace with your actual URL

  return (
    <div className="matching-results">
      <h2>Your Group</h2>
      <div>
        {group.members.map(member => (
          <div key={member.id} className="member-card">
            <h3>{member.name}</h3>
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
      <ShareSocial
        url={socialMediaUrl}
        socialTypes={['facebook', 'twitter', 'linkedin', 'whatsapp']}
      />
    </div>
  );
};

export default MatchingResults;

```