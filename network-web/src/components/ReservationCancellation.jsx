```typescript
import React, { useState } from 'react';

const ReservationCancellation = ({ reservation, onClose, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');

  const handleCancellation = async () => {
    try {
      const response = await fetch(`/reservations/${reservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Display success message to the user
      alert('Reservation cancelled successfully!');
      onCancel(); // Callback to update the parent component
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert(error.message); // Display error message to the user
    }
  };

  return (
    // ... rest of the component code ...
  );
};

export default ReservationCancellation;
```