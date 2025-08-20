```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

export const getRestaurants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data.message || 'Failed to fetch restaurants.';
      throw new Error(errorMessage); // Re-throw error with user-friendly message
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('An error occurred while processing your request.');
    }
  }
};


// Example of another API call with error handling
export const makeReservation = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, data);
    return response.data;
  } catch (error) {
    console.error('Error making reservation:', error);
    if (error.response) {
       const errorMessage = error.response.data.message || 'Failed to make a reservation.';
       throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw new Error('An error occurred while processing your request.');
    }
  }
};

```