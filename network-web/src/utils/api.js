```js
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const postData = async (endpoint, data, options = {}) => {
  // ... existing code
};

/**
 * Cancels a reservation.
 * @param {string} reservationId - The ID of the reservation to cancel.
 * @param {string} reason - The optional reason for cancellation.
 * @returns {Promise<void>}
 * @throws {Error} If the cancellation fails.
 */
export const cancelReservation = async (reservationId, reason = '') => {
  try {
    await fetchData(`/reservation/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cancellationReason: reason }),
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;
  }
};
```