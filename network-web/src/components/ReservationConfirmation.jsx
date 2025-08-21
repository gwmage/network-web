```typescript
import React from 'react';

export const ReservationConfirmation = ({ reservation }) => {
  if (!reservation) {
    return null; // Or a loading indicator
  }

  return (
    <div>
      <h3>Reservation Confirmed!</h3>
      <p>Here are your reservation details:</p>
      <ul>
        <li>Restaurant ID: {reservation.restaurantId}</li>
        <li>User ID: {reservation.userId}</li>
        <li>Date and Time: {reservation.dateTime}</li>
        <li>Number of People: {reservation.numberOfPeople}</li>
      </ul>
    </div>
  );
};

```