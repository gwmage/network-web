```typescript
import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';


const UserMatchingResults = () => {
  const [matchingData, setMatchingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        const data = await api.getMatchingGroups();
        setMatchingData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Fetching matching results...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  if (!matchingData || !Array.isArray(matchingData) || matchingData.length === 0) {
    return <Alert severity="info">No matching results found.</Alert>;
  }



  return (
    <div>
      <h2>Matching Results</h2>
      {matchingData.map((group) => (
        <List key={group.id}>
          <ListItem>
            <ListItemText
              primary={`Group ${group.id}`}
              secondary={group.matchingRationale || 'No rationale provided.'}
            />
          </ListItem>
           <List>
             {group.participants && group.participants.map(user => (
               <ListItem key={user.id}>
                 <ListItemText primary={user.name || user.nickname || `User ${user.id}`} />
               </ListItem>
             ))}
           </List>
        </List>
      ))}
    </div>
  );
};

export default UserMatchingResults;
```