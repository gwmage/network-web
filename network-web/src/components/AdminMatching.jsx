// File: network-web/src/components/AdminMatching.jsx
import React, { useState, useEffect } from 'react';

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState([]);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);

  const fetchMatchingStatus = async () => {
    try {
      const response = await fetch('/matching/status');
      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error as JSON
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`); // Include error message if available
      }
      const data = await response.json();
      setMatchingStatus(data);
    } catch (error) {
      console.error("Error fetching matching status:", error);  // Log the full error object for debugging
      setMatchingError(error.message);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const response = await fetch('/matching/results'); // Correct endpoint
      if (!response.ok) {
        const errorData = await response.json(); // Try to get error details
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      const data = await response.json();
      setMatchingResults(data);
    } catch (error) {
      console.error("Error fetching matching results:", error); // Improved error logging
      setMatchingError(error.message);
    }
  };

  const triggerMatching = async () => {
    try {
      setTriggering(true);
      const response = await fetch('/matching', { method: 'POST' });
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error as JSON
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`); // Add more context to error message
      }
      // Optionally update matching status immediately or wait for next refresh
      await fetchMatchingStatus();
      await fetchMatchingResults();
    } catch (error) {
      console.error("Error triggering matching:", error); // Log the full error object
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
      {/* ... rest of the component JSX ... */}
    </div>
  );
};

export default AdminMatching;
