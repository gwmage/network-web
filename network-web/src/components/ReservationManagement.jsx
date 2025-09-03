```typescript
import React, { useState, useEffect } from 'react';
import ReservationCancellation from './ReservationCancellation';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/reservations');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Handle error, e.g., display an error message
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = (reservationId) => {
    setSelectedReservation(reservations.find(r => r.id === reservationId));
    setIsCancellationModalOpen(true);
  };


  const handleCloseCancellationModal = () => {
    setIsCancellationModalOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmCancellation = () => {
    setIsCancellationModalOpen(false);
      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      setSelectedReservation(null);
  };



  return (
    <div>
      {/* ... other JSX ... */}
      <h2>My Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {/* ... reservation details ... */}
            <button onClick={() => handleCancelReservation(reservation.id)}>Cancel</button>
          </li>
        ))}
      </ul>

      {selectedReservation && isCancellationModalOpen && (
        <ReservationCancellation
          reservation={selectedReservation}
          onClose={handleCloseCancellationModal}
          onCancel={handleConfirmCancellation}
        />
      )}
    </div>
  );
};

export default ReservationManagement;

```