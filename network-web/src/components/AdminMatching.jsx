```jsx
import React, { useState, useEffect } from 'react';
import MatchingProgress from './MatchingProgress'; // Assuming this component exists

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);


  const fetchMatchingStatus = async () => {
    try {
      const response = await fetch('/matching/status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMatchingStatus(data);
    } catch (error) {
      setMatchingError(error.message);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const response = await fetch('/matching/groups'); // Updated endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMatchingResults(data);
    } catch (error) {
      setMatchingError(error.message);
    }
  };


  const triggerMatching = async () => {
    try {
      setTriggering(true); // Disable button and indicate processing
      const response = await fetch('/matching', { method: 'POST' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Optionally update matching status immediately or wait for next refresh
      await fetchMatchingStatus();
       await fetchMatchingResults();
    } catch (error) {
      setMatchingError(error.message);
    } finally {
      setTriggering(false); // Re-enable button
    }
  };

  useEffect(() => {
    fetchMatchingStatus();
    fetchMatchingResults();
  }, []);

  return (
    <div>
      <h2>Matching Management</h2>
      <button onClick={triggerMatching} disabled={triggering}>
        {triggering ? 'Triggering...' : 'Trigger Matching'}
      </button>

      {matchingStatus && (
        <div>
          <h3>Matching Status:</h3>
          <pre>{JSON.stringify(matchingStatus, null, 2)}</pre>
          <MatchingProgress status={matchingStatus} />
        </div>
      )}

      {matchingResults && (
        <div>
          <h3>Matching Results:</h3>
          <pre>{JSON.stringify(matchingResults, null, 2)}</pre>
        </div>
      )}

      {matchingError && (
        <div>
          <h3>Error:</h3>
          <p>{matchingError}</p>
        </div>
      )}
    </div>
  );
};

export default AdminMatching;

```