"import React, { useState, useEffect } from 'react';
import MatchingResultsDisplay from './MatchingResultsDisplay';
import { getMatchingStatus, getMatchingResults, getMatchingExplanations, triggerMatching } from '../utils/api';
import ErrorDisplay from './ErrorDisplay';

const MatchingManagement = () => {
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState(null);
  const [explanations, setExplanations] = useState(null);
  const [error, setError] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [logsVisible, setLogsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getMatchingStatus();
        setStatus(statusData);
        const resultsData = await getMatchingResults();
        setResults(resultsData);
        const explanationsData = await getMatchingExplanations();
        setExplanations(explanationsData);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);

  const handleTriggerMatching = async () => {
    try {
      setTriggering(true);
      await triggerMatching();
      const statusData = await getMatchingStatus();
      setStatus(statusData);
      const resultsData = await getMatchingResults();
      setResults(resultsData);
      const explanationsData = await getMatchingExplanations();
      setExplanations(explanationsData);
    } catch (err) {
      setError(err);
    } finally {
      setTriggering(false);
    }
  };

  const toggleLogs = () => {
    setLogsVisible(!logsVisible);
  };

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div>
      <h2>Matching Management</h2>
      <button onClick={handleTriggerMatching} disabled={triggering}>
        {triggering ? 'Triggering...' : 'Trigger Matching'}
      </button>
      <button onClick={toggleLogs}>
        {logsVisible ? 'Hide Logs' : 'Show Logs'}
      </button>
      {logsVisible && <div>\{/* Placeholder for logs */}</div>}
      {status && <p>Matching Status: {status.state}</p>}
      {results && <MatchingResultsDisplay results={results} explanations={explanations} />}
    </div>
  );
};

export default MatchingManagement;"