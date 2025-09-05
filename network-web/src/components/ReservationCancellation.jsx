```jsx
import React, { useState } from 'react';
import { cancelReservation } from '../utils/api';

const ReservationCancellation = ({ reservations, setReservations }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleReservationSelect = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCancellationReasonChange = (event) => {
    setCancellationReason(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
    setCancellationReason('');
    setError(null);
  };

  const handleConfirmCancellation = async () => {
    try {
      await cancelReservation(selectedReservation.id, cancellationReason);
      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      closeModal();
      alert('Reservation cancelled successfully!'); // Consider a less intrusive success message
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      setError(err.message || 'Failed to cancel reservation.');
    }
  };

  return (
    <div>
      <h3>Cancel Reservation</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id} onClick={() => handleReservationSelect(reservation)}>
            {reservation.description} ({reservation.date})
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="reservation-cancellation-modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Are you sure you want to cancel this reservation: {selectedReservation.description}?</p>
            <label htmlFor="cancellationReason">Cancellation Reason (Optional):</label>
            <textarea
              id="cancellationReason"
              value={cancellationReason}
              onChange={handleCancellationReasonChange}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="confirm-button" onClick={handleConfirmCancellation}>Confirm</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCancellation;

```