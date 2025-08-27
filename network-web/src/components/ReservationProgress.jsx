```typescript
import React from 'react';
import { CircularProgress } from '@mui/material';

const ReservationProgress = ({ status }) => {
  switch (status) {
    case 'processing':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
          <p style={{ marginLeft: '1rem' }}>Processing reservation...</p>
        </div>
      );
    case 'success':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: 'green' }}>Reservation successful!</p>
        </div>
      );
    case 'error':
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
          <p>Error making reservation. Please try again.</p>
        </div>
      );
    default:
      return null;
  }
};

export default ReservationProgress;
```