import React from 'react';
import { Typography } from '@mui/material';

const MatchingResults = ({ matchingResults }) => {
  if (!matchingResults || matchingResults.length === 0) {
    return (
      <Typography variant="body1">No matching results found.</Typography>
    );
  }

  return (
    <div>
      <Typography variant="h6">Matching Results</Typography>
      <ul>
        {matchingResults.map((result) => (
          <li key={result.id}>
            <Typography variant="body1">
              {/* Display relevant information about the match */}
              {result.name} - {result.matchScore}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingResults;
