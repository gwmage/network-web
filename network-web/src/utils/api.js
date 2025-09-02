// File: network-web/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = '/api';

// ... (Existing code remains unchanged)

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/application`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error); // Log the full error object
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(`Server responded with error ${error.response.status}`);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw error; // Re-throw the error
    }
  }
};