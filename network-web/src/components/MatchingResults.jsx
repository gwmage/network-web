```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const MatchingResults = () => {
  const [matchingResults, setMatchingResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchingResults = async () => {
      try {
        const response = await axios.get('/api/matching/results'); // Replace with your actual API endpoint
        setMatchingResults(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching matching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingResults();
  }, []);

  if (loading) {
    return <div>Loading matching results...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!matchingResults || !matchingResults.groups) {
    return <div>No matching results found.</div>;
  }


  return (
    <div>
      <Typography variant="h5" gutterBottom>Matching Results</Typography>
      {matchingResults.groups.map((group, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>Group {index + 1}</Typography>
          <List>
            {group.members.map((member, memberIndex) => (
              <React.Fragment key={memberIndex}>
                <ListItem>
                  <ListItemText primary={member.name} secondary={`ID: ${member.id}`} />
                </ListItem>
                {memberIndex < group.members.length - 1 && <Divider />} {/* Add divider between members */}
              </React.Fragment>
            ))}
          </List>
          {group.explanation && (
            <Typography variant="body2" gutterBottom>Explanation: {group.explanation}</Typography>
          )}
           <Divider /> {/* Add divider between groups */}
        </div>
      ))}
    </div>
  );
};

export default MatchingResults;
```