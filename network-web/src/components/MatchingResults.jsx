```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';
import MatchingResultNotifications from './MatchingResultNotifications'; // Import the notification component

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

        if (groupResponse.data.groups[0].explanation) {
          setExplanation(groupResponse.data.groups[0].explanation);
        } else {
          console.warn("Explanation data is not available in the API response.");
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


  if (!matchingResults || !matchingResults.group || !matchingResults.user) {
    return <div>No matching results found.</div>;
  }

  const { group, user, count } = matchingResults;

  return (
    <div className="matching-results-container">
      <h2>Your Matched Group ({count} results)</h2>

      {/* Include the MatchingResultNotifications component */}
      <MatchingResultNotifications />

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {group.participants.map((member) => (
              <tr key={member.userId}>
                <td>{member.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Your Criteria:</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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