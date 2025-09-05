import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import MatchingResultsDisplay from './MatchingResultsDisplay';

const MatchingProgress = ({ status, results }) => {
  const [visualizationData, setVisualizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisualizationData = async () => {
      try {
        if (status && status.completed && results && results.groupId) { // Check if matching is complete and results are available
          const data = await api.getMatchingVisualization(results.groupId); // Use results.groupId
          setVisualizationData(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisualizationData();
  }, [status, results]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading matching data...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading matching data: {error.message}</Alert>;
  }

  // Display visualization data (if available) after loading is complete and no errors
  if (visualizationData) {
    return (
      <MatchingResultsDisplay results={results.groups} explanations={visualizationData.explanations} />
    );
  }

  // Display a message if no visualization data is available yet (matching still in progress or no results)
  return <Alert severity="info">Matching in progress or no data available yet.</Alert>;
};

export default MatchingProgress;
