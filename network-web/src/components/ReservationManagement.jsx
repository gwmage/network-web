```jsx
import React, { useState, useEffect } from 'react';
import ReservationDetails from './ReservationDetails';
import { fetchData } from '../utils/api';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await fetchData('/reservations');
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchReservations();
  }, []);

  const handleReservationCancelled = (reservationId) => {
    setReservations(reservations.filter((r) => r.id !== reservationId));
  };

  return (
    <div>
      {reservations.map((reservation) => (
        <ReservationDetails
          key={reservation.id}
          reservation={reservation}
          onReservationCancelled={handleReservationCancelled}
        />
      ))}
    </div>
  );
};

export default ReservationManagement;

```