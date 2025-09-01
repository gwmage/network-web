```typescript
import React, { useState } from 'react';
import ReservationCancellation from './ReservationCancellation';

const ReservationDetails = ({ reservation }) => {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  const handleCancelReservation = () => {
    setIsCancellationModalOpen(true);
  };

  const handleCloseCancellationModal = () => {
    setIsCancellationModalOpen(false);
  };

  const handleConfirmCancellation = () => {
    // Logic to handle cancellation confirmation (e.g., API call)
    console.log('Reservation cancelled:', reservation.id);
    // Update UI or state to reflect the cancellation
    // ...

    setIsCancellationModalOpen(false);
  };

  return (
    <div className="reservation-details">
      {/* ... other details ... */}
      <button onClick={handleCancelReservation}>Cancel Reservation</button>

      {isCancellationModalOpen && (
        <ReservationCancellation
          reservation={reservation}
          onClose={handleCloseCancellationModal}
          onCancel={handleConfirmCancellation}
        />
      )}
    </div>
  );
};

export default ReservationDetails;
```