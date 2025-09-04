```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';
import { Box, CircularProgress, Typography, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminMatchingProgress = () => {
  const [status, setStatus] = useState(null);
  const [results, setResults] = useState(null);
  const [visualizationData, setVisualizationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMatchingStatus = async () => {
      try {
        const data = await api.getMatchingStatus();
        setStatus(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingStatus();
  }, []);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      if (status && status.completed) {
        try {
          const data = await api.getMatchingResults();
          setResults(data);
        } catch (error) {
          console.error("Error fetching matching results:", error);
          setError(error)
        }
      }
    };

    fetchMatchingResults();
  }, [status]);

  useEffect(() => {
    const fetchVisualizationData = async () => {
      try {
        if (results && results.groupId) {
          const data = await api.getMatchingVisualization(results.groupId);
          setVisualizationData(data);
        }
      } catch (err) {
        setError(err);
      }
    };
    if(results) fetchVisualizationData();
  }, [results]);



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

  if (status && !status.completed) {
    return <Alert severity="info">Matching in progress...</Alert>;
  }



  if (results && visualizationData) {
    return (
      <div>
        <Typography variant="h4" gutterBottom>Matching Results</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Group ID</TableCell>
                  <TableCell>User IDs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.id}</TableCell>
                    <TableCell>{group.users.map(user => user.id).join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        <Typography variant="h4" gutterBottom sx={{mt: 4}}>Explanations:</Typography>
        {visualizationData.explanations && Object.entries(visualizationData.explanations).map(([groupId, explanation]) => (
          <div key={groupId}>
            <Typography variant="h6" gutterBottom>Group {groupId}:</Typography>
            <Typography>{explanation}</Typography>
          </div>
        ))}
      </div>
    );

  }




  return <Alert severity="info">No matching data found.</Alert>;
};

export default AdminMatchingProgress;

```