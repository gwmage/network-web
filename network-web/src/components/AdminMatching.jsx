```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchingResults from './MatchingResults';
import MatchingProgress from './MatchingProgress';

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);

  const triggerMatching = async () => {
    try {
      const response = await axios.post('/matching');
      setMatchingStatus(response.data);
      setMatchingError(null);
    } catch (error) {
      setMatchingStatus(null);
      setMatchingError(error.message);
    }
  };

  const fetchMatchingStatus = async () => {
    try {
      const response = await axios.get('/matching/status');
      setMatchingStatus(response.data);
      setMatchingError(null);
    } catch (error) {
      setMatchingStatus(null);
      setMatchingError(error.message);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const response = await axios.get('/api/admin/matches/groups'); // Assuming this endpoint for fetching results
      setMatchingResults(response.data);
    } catch (error) {
      console.error("Error fetching matching results:", error);
      // Handle error, maybe display a message to the user
    }
  }

  useEffect(() => {
    fetchMatchingStatus();
    fetchMatchingResults();
  }, []);

  return (
    <div>
      <h2>Matching Management</h2>
      <button onClick={triggerMatching}>Trigger Matching</button>

      {matchingStatus && (
        <div>
          <h3>Matching Status:</h3>
          <pre>{JSON.stringify(matchingStatus, null, 2)}</pre>
          <MatchingProgress status={matchingStatus} />
        </div>
      )}

      {matchingError && (
        <div>
          <h3>Error:</h3>
          <p>{matchingError}</p>
        </div>
      )}

      {matchingResults && (
        <div>
          <h3>Matching Results:</h3>
          <MatchingResults results={matchingResults} />
        </div>
      )}
    </div>
  );
};

export default AdminMatching;

```