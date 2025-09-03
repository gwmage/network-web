import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const MatchingResults = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const results = await api.getMatchingResults();
        setMatchingResults(results);
      } catch (err) {
        console.error('Error fetching matching results:', err);
        setError('Failed to fetch matching results.');
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
    return <div>Error: {error}</div>;
  }

  if (!matchingResults) {
    return <div>No matching results found.</div>;
  } // Add this check

  return (
    <div>
      <h3>Matching Results</h3>
      {/* Display the matching results here */}
      <pre>{JSON.stringify(matchingResults, null, 2)}</pre>
    </div>
  );
};

export default MatchingResults;