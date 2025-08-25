```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';

const MatchingResults: React.FC = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/matching/groups');
        const userResponse = await axios.get('/api/users/me');
        setMatchingResults({ group: groupResponse.data, user: userResponse.data });
        toast.success("Matching successful!");
      } catch (err) {
        console.error("Error fetching matching results:", err);
        setError(err);
        toast.error("Matching failed. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingResults();
  }, []);

  if (loading) {
    return <div>Loading matching results...</div>;
  }

  if (error) {
    return (
      <div>
        <ErrorDisplay error={error.message} />
        <p>Failed to fetch matching results. Please try again later.</p>
      </div>
    );
  }


  if (!matchingResults || !matchingResults.group || !matchingResults.user) {
    return <div>No matching results found.</div>;
  }

  const { group, user } = matchingResults;

  return (
    <div>
      <h2>Your Matched Group</h2>
      <h3>Members:</h3>
      <ul>
        {group.members.map((member) => (
          <li key={member.id}>{member.name} ({member.email})</li>
        ))}
      </ul>
      <h3>Matching Criteria:</h3>
      <p>You were matched with this group based on the following criteria:</p>
      <ul>
        {group.criteria.map((criterion) => (
          <li key={criterion.name}>
            <b>{criterion.name}:</b> {criterion.value} (Your {criterion.name}: {user[criterion.name]})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingResults;

```