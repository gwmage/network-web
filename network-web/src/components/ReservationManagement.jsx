```typescript
  const handleCancelReservation = async () => {
    try {
      const response = await fetch(`/reservation/${selectedReservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from the response
        throw new Error(`${response.status}: ${errorData.message || 'Failed to cancel reservation'}`);
      }

      // Update the reservations list with the modified reservation
      setReservations(reservations.filter((r) => r.id !== selectedReservation.id));
      setSelectedReservation(null);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      // Handle error, e.g., display an error message to the user
      alert(error.message); // Example: Displaying the error in an alert
    }
  };
```