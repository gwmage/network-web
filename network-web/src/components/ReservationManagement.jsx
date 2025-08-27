```typescript
import React, { useState } from 'react';

const ReservationManagement = () => {
  // ... other code ...

  const handleCancelReservation = async () => {
    try {
      const response = await fetch(`/reservation/${selectedReservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        // More specific error handling based on the status code
        if (response.status === 400) {
          throw new Error(`Bad Request: ${errorData.message}`);
        } else if (response.status === 404) {
          throw new Error('Not Found: Reservation not found.');
        } else {
          throw new Error(`${response.status}: ${errorData.message || 'Failed to cancel reservation'}`);
        }
      }

      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      setSelectedReservation(null);
      // Optionally display a success message to the user
      alert('Reservation cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      // Display a more user-friendly error message based on the error type
      alert(error.message);
    }
  };

  // ... other code ...
};

export default ReservationManagement;

```