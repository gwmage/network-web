```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const getNotificationPreferences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    throw new Error('Failed to fetch notification preferences');
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    await axios.put(`${API_BASE_URL}/notifications/preferences`, preferences);
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw new Error('Failed to update notification preferences');
  }
};


export const getRestaurantInfo = async (restaurantId) => {
  try {
    const apiKey = process.env.RESTAURANT_API_KEY; // Assuming API key is stored in environment variables
    if (!apiKey) {
      throw new Error('Restaurant API key is missing.');
    }

    const response = await axios.get(`/reservation/restaurant/${restaurantId}`, {
      headers: {
        'X-Api-Key': apiKey, // Or any other header name expected by the API
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error(`Error fetching restaurant information: ${error.response.status} ${error.response.data.message}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in Node.js
      throw new Error('Network Error');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error fetching restaurant information: ${error.message}`);
    }
  }
};
```