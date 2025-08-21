```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

export const getRestaurants = async () => {
  // ... (Existing code remains unchanged)
};

export const makeReservation = async (data) => {
  // ... (Existing code remains unchanged)
};

export const getReservation = async (reservationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservation/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    if (error.response) {
      const errorMessage = error.response.data.message || 'Failed to fetch reservation.';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw new Error('An error occurred while processing your request.');
    }
  }
};


export const subscribeToReservationUpdates = async (reservationId, callback) => {
  // Replace with your actual WebSocket or polling implementation
  if (!window.WebSocket) {
    console.warn('WebSockets not supported, falling back to polling.');
    pollForReservationUpdates(reservationId, callback);
    return; // Prevent WebSocket setup in browsers that don't support WebSockets.
  }

  try {
    const socket = new WebSocket(`ws://your-websocket-server/reservations/${reservationId}`); // Replace with your WebSocket URL

    socket.onmessage = (event) => {
      const reservation = JSON.parse(event.data);
      callback(reservation);
    };

    socket.onclose = () => {
        console.warn('WebSocket disconnected. Attempting reconnect...');
        setTimeout(() => subscribeToReservationUpdates(reservationId, callback), 5000); // Retry after 5 seconds
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Consider fallback to polling or other error handling
    };


  } catch (error) {
    console.error('Error subscribing to WebSocket:', error);
        // Consider fallback to polling
  }

  
};



const pollForReservationUpdates = async (reservationId, callback) => {
  let previousStatus = null;

  const poll = async () => {
    try {
      const reservation = await getReservation(reservationId);
      if (reservation.status !== previousStatus) {
        callback(reservation);
        previousStatus = reservation.status;
      }
    } catch (error) {
      console.error('Error polling for reservation updates:', error);
    } finally {
      setTimeout(poll, 5000); // Poll every 5 seconds
    }
  };

  poll();
};
```