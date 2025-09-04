```jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const MatchingResultsDisplay = ({ status, results }) => {
  if (!results || results.length === 0) {
    return <Typography>No matching results found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group ID</TableCell>
            <TableCell>User IDs</TableCell>
            {/* Add other relevant columns as needed (e.g., match score, criteria values) */}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.users.map(user => user.id).join(', ')}</TableCell>
              {/* Populate other cells with relevant data */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default MatchingResultsDisplay;

```