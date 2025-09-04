```jsx
import React, { useState, useEffect } from 'react';
import MatchingProgress from './MatchingProgress';
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';

const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [weights, setWeights] = useState({});
  const [weightsError, setWeightsError] = useState(null);


  const fetchMatchingStatus = async () => {
    try {
      const data = await api.getMatchingStatus();
      setMatchingStatus(data);
    } catch (error) {
      setMatchingError(error);
    }
  };

  const fetchMatchingResults = async () => {
    try {
      const data = await api.getMatchingResults();
      setMatchingResults(data);
    } catch (error) {
      setMatchingError(error); 
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
      await fetchMatchingResults();
    } catch (error) {
      setMatchingError(error);
    } finally {
      setTriggering(false);
    }
  };

  const fetchWeights = async () => {
    try {
      const data = await api.getMatchingWeights();
      setWeights(data);
    } catch (error) {
      setWeightsError(error);
    }
  };

  const handleWeightChange = (event) => {
    setWeights({
      ...weights,
      [event.target.name]: parseFloat(event.target.value),
    });
  };

  const updateWeights = async () => {
    try {
      await api.updateMatchingWeights(weights);
      fetchWeights(); // Refresh weights after update
    } catch (error) {
      setWeightsError(error);
    }
  };


  useEffect(() => {
    fetchMatchingStatus();
    fetchMatchingResults();
    fetchWeights();
  }, []);

  return (
    <div>
      <h2>Matching Management</h2>
      <Button onClick={triggerMatching} disabled={triggering} variant="contained" color="primary">
        {triggering ? 'Triggering...' : 'Trigger Matching'}
      </Button>

      {matchingError && <ErrorDisplay error={matchingError} />}

      {matchingStatus && !matchingError && (
        <MatchingProgress status={matchingStatus} results={matchingResults} />
      )}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Algorithm Weights
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(weights).map(([criterion, weight]) => (
            <Grid item xs={12} sm={6} key={criterion}>
              <TextField
                label={criterion}
                type="number"
                inputProps={{ step: "0.1", min: "0", max: "1" }} // Add validation
                name={criterion}
                value={weight}
                onChange={handleWeightChange}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
          {weightsError && <ErrorDisplay error={weightsError} />}

        <Button variant="contained" color="secondary" onClick={updateWeights} sx={{mt: 2}}>
          Update Weights
        </Button>
      </Box>
    </div>
  );
};

export default AdminMatching;

```