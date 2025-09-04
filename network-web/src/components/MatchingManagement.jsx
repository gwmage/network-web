import React, { useState, useEffect } from 'react';
import MatchingResultsDisplay from './MatchingResultsDisplay';
import { getMatchingStatus, getMatchingResults, getMatchingExplanations, triggerMatching, getMatchingProgress, getMatchingGroups } from '../utils/api';
import ErrorDisplay from './ErrorDisplay';
import MatchingGroupDisplay from './MatchingGroupDisplay';


const MatchingManagement = () => {
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState(null);
  const [explanations, setExplanations] = useState(null);
  const [error, setError] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [logsVisible, setLogsVisible] = useState(false);
  const [progress, setProgress] = useState(null);
  const [groups, setGroups] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getMatchingStatus();
        setStatus(statusData);
        const resultsData = await getMatchingResults();
        setResults(resultsData);
        const explanationsData = await getMatchingExplanations();
        setExplanations(explanationsData);
        const groupsData = await getMatchingGroups();
        setGroups(groupsData);

      } catch (err) {
        setError(err);
      }
    };
    fetchData();


    const fetchProgress = async () => {
      try {
        const progressData = await getMatchingProgress();
        setProgress(progressData);
      } catch (err) {
        console.error("Failed to fetch matching progress:", err);
      }
    }
    fetchProgress();


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

      {progress && (
        <div>
          <h3>Matching Progress</h3>
          <p>Status: {progress.state}</p>
          {progress.startTime && <p>Start Time: {progress.startTime}</p>}
          {progress.endTime && <p>End Time: {progress.endTime}</p>}
          {progress.currentStage && <p>Current Stage: {progress.currentStage}</p>}
          {progress.progress && <p>Progress: {progress.progress}%</p>}
        </div>
      )}


      <button onClick={toggleLogs}>
        {logsVisible ? 'Hide Logs' : 'Show Logs'}
      </button>
      {logsVisible && <div>{/* Placeholder for logs */}</div>}
      {status && <p>Matching Status: {status.state}</p>}
      {results && <MatchingResultsDisplay results={results} explanations={explanations} />}

      <h3>Matching Groups</h3>
      {groups.map((group) => (
        <MatchingGroupDisplay key={group.groupId} group={group} />
      ))}

    </div>
  );
};

export default MatchingManagement;