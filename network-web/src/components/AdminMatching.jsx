```jsx
import React, { useState, useEffect } from 'react';
import MatchingProgress from './MatchingProgress';
import ErrorDisplay from './ErrorDisplay';
import * as api from '../utils/api';
import { Box, Button, TextField, Typography, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceGroupId = parseInt(result.source.droppableId, 10);
    const destinationGroupId = parseInt(result.destination.droppableId, 10);

    if (sourceGroupId === destinationGroupId) {
      return;
    }


  };

  useEffect(() => {
    fetchMatchingStatus();
    fetchMatchingResults();
    fetchWeights();
    fetchGroups();
  }, []);



  const handleUserRemove = async (userId, groupId) => {
      try {
          const updatedGroups = groups.map(group => {
              if (group.id === groupId) {
                  return {
                      ...group,
                      users: group.users.filter(user => user.id !== userId)
                  }
              }
              return group;
          });
          await api.updateMatchingGroup(groupId, { users: updatedGroups.find(group => group.id === groupId).users }); // Update in backend
          setGroups(updatedGroups);
      } catch (error) {
          setGroupsError("Failed to remove user from group");
      }
  };



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

        <h2>Matching Groups</h2>

      {groupsError && <ErrorDisplay error={groupsError} />}
      {loadingGroups ? (
          <p>Loading groups...</p>
      ) : (
          <div>
              {groups.map((group) => (
                  <div key={group.id}>
                      <h3>Group {group.id}</h3>
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
                  </div>
              ))}
          </div>
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

        <Button variant="contained" color="secondary" onClick={updateWeights} sx={{mt: 2}}>
          Update Weights
        </Button>
      </Box>
    </div>
  );
};

export default AdminMatching;

```
---[END_OF_FILES]---