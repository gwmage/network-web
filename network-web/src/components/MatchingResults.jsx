```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';
import ReactTooltip from 'react-tooltip';

const MatchingResults: React.FC = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const response = await axios.get('/api/matching/results/me'); // Updated endpoint
        setMatchingResults(response.data);
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

  if (!matchingResults || !matchingResults.groups) {
    return <div>No matching results found.</div>;
  }

  const { groups } = matchingResults;

  return (
    <div>
      <h2>Your Matched Groups</h2>
      {groups.map((group) => (
        <div key={group.groupId}>
          <h3>Group {group.groupId} (Matching Score: {group.matchingScore || 'N/A'})</h3>
          <h4>Members:</h4>
          <ul>
            {group.participants.map((participant) => (
              <li key={participant.userId}>
                {participant.name}
              </li>
            ))}
          </ul>
          <h4>Explanation:</h4>
          <p data-tip={group.explanation}>{group.explanation ? group.explanation.slice(0, 50) + "..." : "No explanation available."}</p>
          <ReactTooltip />
        </div>
      ))}
    </div>
  );
};

export default MatchingResults;

```