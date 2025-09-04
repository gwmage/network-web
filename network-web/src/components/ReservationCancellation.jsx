```jsx
import React, { useState, useEffect } from 'react';
import { fetchData, cancelReservation } from '../utils/api';

const ReservationCancellation = ({ reservations, setReservations }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReservationSelect = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCancellationReasonChange = (event) => {
    setCancellationReason(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null); // Reset selected reservation when modal closes
    setCancellationReason('');
  };



  const handleConfirmCancellation = async () => {
    try {
      await cancelReservation(selectedReservation.id, cancellationReason);
      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      closeModal();
      alert('Reservation cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert(`Failed to cancel reservation: ${error.message}`);
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

      {selectedReservation && (
        <div>
          <label htmlFor="cancellationReason">Cancellation Reason (Optional):</label>
          <textarea
            id="cancellationReason"
            value={cancellationReason}
            onChange={handleCancellationReasonChange}
          />
          <button onClick={openModal}>Cancel Reservation</button>
        </div>
      )}



      {isModalOpen && (
        <div className="reservation-cancellation-modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <p>Are you sure you want to cancel this reservation?</p>
            <button className="confirm-button" onClick={handleConfirmCancellation}>
              Confirm
            </button>
            <button className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCancellation;

```