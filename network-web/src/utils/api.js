// network-web/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/application`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);    
    // More robust error handling.  Re-throw error after logging to preserve stack trace
    if (error.response) {
      throw new Error(`Server responded with error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('No response received from server.');
    } else {
      throw error; // Re-throw the original error
    }
  }
};
