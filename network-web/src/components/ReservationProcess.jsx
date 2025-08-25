```typescript
import React, { useState } from 'react';
import { makeReservation } from '../utils/api';
import ReservationForm from './ReservationForm'; // Import the ReservationForm component

const ReservationProcess = () => {
  const [reservationStatus, setReservationStatus] = useState('idle'); // idle, processing, success, error
  const [reservationData, setReservationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleReservationSubmit = async (data) => {
    setReservationStatus('processing');
    setErrorMessage('');

    try {
      const reservation = await makeReservation(data);
      console.log('Reservation successful:', reservation);
      setReservationStatus('success');
      setReservationData(reservation);
    } catch (error) {
      console.error('Error making reservation:', error);
      setReservationStatus('error');
      setErrorMessage(error.message || 'An unknown error occurred.');
    }
  };

  return (
    <div>
      <h2>Make a Reservation</h2>

      {/* Visual feedback based on reservation status */}
      {reservationStatus === 'processing' && (
        <div>
          <p>Processing reservation...</p>
          {/* Add a loading indicator or progress bar here */}
          <progress value="50" max="100"></progress> {/* Example progress bar */}
        </div>
      )}
      {reservationStatus === 'success' && (
        <div>
          <p>Reservation successful!</p>
          {/* Display reservation details */}
          <pre>{JSON.stringify(reservationData, null, 2)}</pre>
        </div>
      )}
      {reservationStatus === 'error' && (
        <p style={{ color: 'red' }}>Error: {errorMessage}</p>
      )}

      {/* Show the form if not successful or processing */}
      {(reservationStatus === 'idle' || reservationStatus === 'error') && (
        <ReservationForm onSubmit={handleReservationSubmit} />
      )}
    </div>
  );
};

export default ReservationProcess;

```