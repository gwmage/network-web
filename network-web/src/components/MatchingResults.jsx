```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';

const MatchingResults: React.FC = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [explanations, setExplanations] = useState([]);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const groupResponse = await axios.get('/api/matching');
        const userResponse = await axios.get('/api/users/me');
        setMatchingResults({ groups: groupResponse.data, user: userResponse.data });
        toast.success("Matching successful!");

        const fetchedExplanations = await Promise.all(
          groupResponse.data.map((group) =>
            axios.get(`/api/matching/${group.id}/explanation`)
              .then(res => res.data)
              .catch((err) => {
                console.error("Error fetching explanation for group:", err);
                toast.error(`Failed to fetch explanation for group ${group.id}`);
                return null;
              })
          )
        );
        setExplanations(fetchedExplanations);

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

  if (!matchingResults || !matchingResults.groups || !matchingResults.user) {
    return <div>No matching results found.</div>;
  }

  const { groups, user } = matchingResults;

  return (
    <div>
      <h2>Your Matched Groups</h2>
      {groups.map((group, index) => (
        <div key={group.id}>
          <h3>Group {index + 1} (Matching Score: {group.matchingScore || 'N/A'})</h3>
          <h4>Members:</h4>
          <ul>
            {group.participants.map((participant) => (
              <li key={participant.userId}>
                {user.id === participant.userId ? "You" : `User ${participant.userId}`}
              </li>
            ))}
          </ul>
          <h4>Explanation:</h4>
          <p>{explanations[index] || "No explanation available."}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchingResults;

```