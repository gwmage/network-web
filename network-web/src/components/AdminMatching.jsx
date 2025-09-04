```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MatchingResultsDisplay from './MatchingResultsDisplay';
import MatchingCriteriaConfiguration from './MatchingCriteriaConfiguration';
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api';
import { Box, Button, Typography, Grid, List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const AdminMatching = () => {
  const [matchingStatus, setMatchingStatus] = useState(null);
  const [matchingResults, setMatchingResults] = useState(null);
  const [matchingError, setMatchingError] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [weights, setWeights] = useState({});
  const [weightsError, setWeightsError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groupsError, setGroupsError] = useState(null);
  const [criteria, setCriteria] = useState([]);


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
      await api.triggerMatching();
      await fetchMatchingStatus();
      await fetchMatchingResults();
      fetchGroups();
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
      fetchWeights();
    } catch (error) {
      setWeightsError(error);
    }
  };


  const fetchGroups = async () => {
    try {
      setLoadingGroups(true);
      const data = await api.getMatchingGroups();
      setGroups(data);
    } catch (error) {
      setGroupsError(error);
    } finally {
      setLoadingGroups(false);
    }
  };

  const handleUserRemove = async (userId, groupId) => {
    try {
      await api.removeUserFromGroup(groupId, userId);
      fetchGroups(); // Refresh groups after update
    } catch (error) {
      setGroupsError("Failed to remove user from group");
    }
  };



  useEffect(() => {
    fetchMatchingStatus();
    fetchMatchingResults();
    fetchWeights();
    fetchGroups();
    const fetchCriteria = async () => {
      try {
        const data = await api.getMatchingCriteria();
        setCriteria(data);
      } catch (error) {
        console.error("Error fetching matching criteria:", error);
      }
    };
    fetchCriteria();

  }, []);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>Matching Management</Typography>

      <Button onClick={triggerMatching} disabled={triggering} variant="contained" color="primary">
        {triggering ? 'Triggering...' : 'Trigger Matching'}
      </Button>
      <Button component={Link} to="/admin/matching/progress" variant="contained" color="secondary" sx={{ ml: 2 }}>
        View Matching Progress
      </Button>


      {matchingError && <ErrorDisplay error={matchingError} />}

      {matchingStatus && !matchingError && (
        <MatchingResultsDisplay status={matchingStatus} results={matchingResults} />
      )}

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Matching Groups</Typography>
      {groupsError && <ErrorDisplay error={groupsError} />}
      {loadingGroups ? (
        <Typography>Loading groups...</Typography>
      ) : (
        <Grid container spacing={2}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Box border={1} p={2}>
                <Typography variant="h5" gutterBottom>Group {group.id}</Typography>
                <List>
                  {group.users && group.users.map((user) => (
                    <ListItem
                      key={user.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleUserRemove(user.id, group.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={user.name} secondary={`ID: ${user.id}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}


      <MatchingCriteriaConfiguration criteria={criteria} setCriteria={setCriteria} />

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Algorithm Weights
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(weights).map(([criterion, weight]) => (
            <Grid item xs={12} sm={6} key={criterion}>
              <TextField
                label={criterion}
                type="number"
                inputProps={{ step: "0.1", min: "0", max: "1" }}
                name={criterion}
                value={weight}
                onChange={handleWeightChange}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
        {weightsError && <ErrorDisplay error={weightsError} />}

        <Button variant="contained" color="secondary" onClick={updateWeights} sx={{ mt: 2 }}>
          Update Weights
        </Button>
      </Box>
    </Box>
  );
};

export default AdminMatching;

```
---[END_OF_FILES]---