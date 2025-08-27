```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';

const MatchingResults: React.FC = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/matching/groups');
        const userResponse = await axios.get('/api/users/me');
        setMatchingResults({ group: groupResponse.data.groups[0], user: userResponse.data, count: groupResponse.data.count });
        toast.success("Matching successful!");

        if (groupResponse.data.groups[0] && groupResponse.data.groups[0].explanation) {
          setExplanation(groupResponse.data.groups[0].explanation);
        } else {
          console.warn("Explanation data is not available or the group is empty in the API response.");
          setExplanation(null);
        }
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


  if (!matchingResults || !matchingResults.group || !matchingResults.group.participants) {
    return <div>No matching results found.</div>;
  }

  const { group, user, count } = matchingResults;

  return (
    <div>
      <h2>Your Matched Group ({count} results)</h2>
      <h3>Members:</h3>
      <ul>
        {group.participants.map((member) => (
          <li key={member.userId}>{member.name} ({member.email})</li>
        ))}
      </ul>
      <h3>Your Criteria:</h3>
      <pre>{JSON.stringify(user.matchingPreferences, null, 2)}</pre>
      {explanation && (
        <>
          <h3>Explanation:</h3>
          <p>{explanation}</p>
        </>
      )}
    </div>
  );
};

export default MatchingResults;

```