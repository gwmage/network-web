import React, { useState } from 'react';
import ReservationCancellation from './ReservationCancellation';

const ReservationDetails = ({ reservation, onReservationCancelled }) => {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleCancelReservation = () => {
    setIsCancellationModalOpen(true);
  };

  const handleCloseCancellationModal = () => {
    setIsCancellationModalOpen(false);
  };

  const handleConfirmCancellation = () => {
    setIsCancellationModalOpen(false);
    setIsCancelled(true);
    onReservationCancelled(reservation.id);
  };

  return (
    <div className="reservation-details">
      {/* ... other details ... */}
      {!isCancelled && <button onClick={handleCancelReservation}>Cancel Reservation</button>}
      {isCancelled && <span>Cancelled</span>}

      {isCancellationModalOpen && (
        <div className="modal-overlay">
          <ReservationCancellation
            reservation={reservation}
            onClose={handleCloseCancellationModal}
            onCancel={handleConfirmCancellation}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationDetails;