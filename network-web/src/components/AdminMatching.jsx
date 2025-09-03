```jsx
import React, { useState, useEffect } from 'react';
import MatchingProgress from './MatchingProgress';
import ErrorDisplay from './ErrorDisplay'; // Import the ErrorDisplay component

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);

  const fetchMatchingStatus = async () => {
    try {
      const response = await fetch('/matching/status');
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to fetch matching status: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setMatchingStatus(data);
    } catch (error) {
      setMatchingError(error); // Store the entire error object
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const response = await fetch('/matching/groups'); // Or /matching/results depending on your backend
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to fetch matching results: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setMatchingResults(data);
    } catch (error) {
      setMatchingError(error); // Store the entire error object
    }
  };

  const triggerMatching = async () => {
    try {
      setTriggering(true);
      const response = await fetch('/matching', { method: 'POST' });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Failed to trigger matching: ${response.status}`;
        throw new Error(errorMessage);
      }
      await fetchMatchingStatus();
      await fetchMatchingResults(); // Fetch results after triggering
    } catch (error) {
      setMatchingError(error); // Store the entire error object
    } finally {
      setTriggering(false);
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

      {/* Display error message using ErrorDisplay */}
      {matchingError && <ErrorDisplay error={matchingError} />}

      {matchingStatus && !matchingError && (
        <MatchingProgress status={matchingStatus} results={matchingResults} />
      )}
    </div>
  );
};

export default AdminMatching;

```