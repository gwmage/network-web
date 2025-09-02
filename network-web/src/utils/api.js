// File: network-web/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/application`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(`Server responded with error ${error.response.status}`); // Or handle the error as needed
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
      throw error; // Re-throw the error
    }
  }
};