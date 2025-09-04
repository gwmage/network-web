```jsx
import React, { useState, useEffect } from 'react';
import ReservationCancellation from './ReservationCancellation';
import { fetchData } from '../utils/api';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await fetchData('/reservations'); // Fetch upcoming reservations
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Handle error, e.g., display an error message
      }
    };
    fetchReservations();
  }, []);



  return (
    <div>
      {/* ... other code ... */}
      <ReservationCancellation reservations={reservations} setReservations={setReservations} />
    </div>
  );
};

export default ReservationManagement;

```