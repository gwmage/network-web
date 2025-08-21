```typescript
import React, { useState, useEffect } from 'react';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modifiedReservation, setModifiedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/reservation');
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

  const handleSelectReservation = (reservation) => {
    setSelectedReservation(reservation);
    setModifiedReservation({ ...reservation });
  };

  const handleInputChange = (event) => {
    setModifiedReservation({
      ...modifiedReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateReservation = async () => {
    try {
      const response = await fetch(`/reservation/${selectedReservation.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedReservation),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the reservations list with the modified reservation
      setReservations(
        reservations.map((r) => (r.id === selectedReservation.id ? modifiedReservation : r))
      );
      setSelectedReservation(null);
      setModifiedReservation(null);
    } catch (error) {
      console.error('Error updating reservation:', error);
      // Handle error, e.g., display an error message
    }
  };

  const handleCancelReservation = async () => {
    try {
      const response = await fetch(`/reservation/${selectedReservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the cancelled reservation from the list
      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      setSelectedReservation(null);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div>
      <h2>Reservation Management</h2>
      <h3>Existing Reservations:</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <button onClick={() => handleSelectReservation(reservation)}>Modify/Cancel</button>
            {' '}
            {JSON.stringify(reservation)}
          </li>
        ))}
      </ul>

      {selectedReservation && (
        <div>
          <h3>Modify/Cancel Reservation:</h3>
          <form>
            {/* Input fields for modifiable reservation details */}
            <label htmlFor="dateTime">Date/Time:</label>
            <input
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={modifiedReservation.dateTime}
              onChange={handleInputChange}
            />
             <label htmlFor="numberOfPeople">Number of People:</label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              value={modifiedReservation.numberOfPeople}
              onChange={handleInputChange}
            />
            {/* Add other input fields as needed */}
            <button type="button" onClick={handleUpdateReservation}>
              Update Reservation
            </button>
            <button type="button" onClick={handleCancelReservation}>
              Cancel Reservation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
```