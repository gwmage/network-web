```javascript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const MatchingProgressDisplay = () => {
  const [matchingData, setMatchingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        const data = await api.getMatchingGroups();
        setMatchingData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMatchingData();
  }, []);

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

  if (matchingData && matchingData.groups) {
    return (
      <div>
        {matchingData.groups.map((group, index) => (
          <div key={index}>
            <h3>Group {index + 1}</h3>
            <ul>
              {group.map((user, userIndex) => (
                <li key={userIndex}>{user.name || user.id} </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return <Alert severity="info">No matching data found.</Alert>;
};

export default MatchingProgressDisplay;

```