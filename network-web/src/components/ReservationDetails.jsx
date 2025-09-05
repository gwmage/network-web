```jsx
import React, { useState } from 'react';
import ReservationCancellation from './ReservationCancellation';

const ReservationDetails = ({ reservation, onReservationCancelled }) => {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  const handleCancelReservation = () => {
    setIsCancellationModalOpen(true);
  };

  const handleCloseCancellationModal = () => {
    setIsCancellationModalOpen(false);
  };

  const handleConfirmCancellation = () => {
    setIsCancellationModalOpen(false);
    onReservationCancelled(reservation.id);
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