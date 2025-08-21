```typescript
import React, { useState } from 'react';
import { makeReservation } from '../utils/api';

const ReservationProcess = () => {
  const [dateTime, setDateTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [restaurantId, setRestaurantId] = useState(''); // Make sure to set this value
  const [userId, setUserId] = useState(''); // Make sure to set this value, perhaps through a login process
  const [reservationStatus, setReservationStatus] = useState('idle'); // idle, processing, success, error
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setReservationStatus('processing');
    setErrorMessage('');

    try {
      const reservation = await makeReservation({
        restaurantId,
        userId,
        dateTime: dateTime.toString(), // Ensure dateTime is a string
        numberOfPeople,
      });
      console.log('Reservation successful:', reservation);
      setReservationStatus('success');


    } catch (error) {
      console.error('Error making reservation:', error);
      setReservationStatus('error');
      setErrorMessage(error.message);
    }
  };


  return (
    <div>
      <h2>Make a Reservation</h2>
      {reservationStatus === 'processing' && <p>Processing reservation...</p>}
      {reservationStatus === 'success' && <p>Reservation successful!</p>}
      {reservationStatus === 'error' && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}


      {reservationStatus !== 'success' && (
        <form onSubmit={handleSubmit}>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
            required
          />
          <button type="submit">Make Reservation</button>
        </form>
      )}
    </div>
  );
};


export default ReservationProcess;
```