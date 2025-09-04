import React, { useState } from 'react';
import { cancelReservation } from '../utils/api';
import { handleReservationCancellationNotification } from '../utils/pushNotifications';
import ErrorDisplay from './ErrorDisplay'; // Import your error component

const ReservationCancellation = ({ reservation, onClose, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [error, setError] = useState(null);

  const handleCancellation = async () => {
    try {
      await cancelReservation(reservation.id, cancellationReason);
      handleReservationCancellationNotification(reservation.id);
      alert('Reservation cancelled successfully!');
      onCancel();
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setError(error.message); // Set error message to state
    }
  };

  return (
    <div className="reservation-cancellation-modal">
      <h3>Cancel Reservation</h3>
      <p>Are you sure you want to cancel reservation {reservation.id}?</p>
      <label htmlFor="cancellationReason">Reason for Cancellation (Optional):</label>
      <textarea id="cancellationReason" value={cancellationReason} onChange={(e) => setCancellationReason(e.target.value)} />
      {error && <ErrorDisplay message={error} />}
      <div className="modal-buttons">
        <button onClick={onClose}>Close</button>
        <button onClick={handleCancellation}>Confirm Cancellation</button>
      </div>
    </div>
  );
};

export default ReservationCancellation;