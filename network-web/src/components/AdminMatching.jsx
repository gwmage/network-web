// File: network-web/src/components/AdminMatching.jsx
import React, { useState, useEffect } from 'react';

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);

  const fetchMatchingStatus = async () => {
    try {
      const response = await fetch('/api/matching/status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMatchingStatus(data);
    } catch (error) {
      console.error("Error fetching matching status:", JSON.stringify(error, null, 2));
      setMatchingError(error.message);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const response = await fetch('/api/matching/results');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMatchingResults(data);
    } catch (error) {
      console.error("Error fetching matching results:", JSON.stringify(error, null, 2));
      setMatchingError(error.message);
    }
  };

  const triggerMatching = async () => {
    try {
      setTriggering(true);
      const response = await fetch('/api/matching', { method: 'POST' });
      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error details
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`); // Provide more specific error message
      }
      await fetchMatchingStatus();
      await fetchMatchingResults();
    } catch (error) {
      console.error("Error triggering matching:", JSON.stringify(error, null, 2));
      setMatchingError(error.message);
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
      {/* ... rest of your component */}
    </div>
  );
};

export default AdminMatching;