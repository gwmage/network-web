```jsx
import React, { useState } from 'react';
import { cancelReservation } from '../utils/api';

const ReservationCancellation = ({ reservation, onClose, onCancel }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [error, setError] = useState(null);

  const handleCancellationReasonChange = (event) => {
    setCancellationReason(event.target.value);
  };

  const handleConfirmCancellation = async () => {
    try {
      await cancelReservation(reservation.id, cancellationReason);
      onCancel(); // Call the onCancel callback to update parent component
      // alert('Reservation cancelled successfully!'); // Consider a less intrusive success message
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      setError(err.message || 'Failed to cancel reservation.');
    }
  };

  return (
    <div className="reservation-cancellation-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>Are you sure you want to cancel this reservation: {reservation.description}?</p>
        <label htmlFor="cancellationReason">Cancellation Reason (Optional):</label>
        <textarea
          id="cancellationReason"
          value={cancellationReason}
          onChange={handleCancellationReasonChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="confirm-button" onClick={handleConfirmCancellation}>Confirm</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ReservationCancellation;

```