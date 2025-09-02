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
        const errorData = await response.json(); // Try to parse JSON error
        const errorMessage = errorData.message || `Failed to fetch matching status: ${response.status}`; // Use error message from JSON or generic message
        throw new Error(errorMessage);
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
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to fetch matching results: ${response.status}`;
        throw new Error(errorMessage);
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
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to trigger matching: ${response.status}`;
        throw new Error(errorMessage);
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
      {matchingError && <div>Error: {matchingError}</div>}

      {matchingStatus && (
        <MatchingProgress status={matchingStatus} results={matchingResults} />
      )}
    </div>
  );
};

export default AdminMatching;
```