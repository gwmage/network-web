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

      onCancel(); // Callback to update the parent component
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert(error.message); // Display error message to the user
    }
  };

  return (
    <div className="reservation-cancellation-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Cancel Reservation</h2>
        <p>Are you sure you want to cancel this reservation?</p>
        <textarea
          placeholder="Reason for cancellation (optional)"
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          rows="4"
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px', marginTop: '10px', resize: 'vertical' }}
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>No</button>
          <button className="confirm-button" onClick={handleCancellation}>Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCancellation;

```