"import axios from 'axios';

const API_BASE_URL = '/api';

// ... (Existing code remains unchanged)

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.response) {
      throw error; // Re-throw the error to be handled by the caller
    } else if (error.request) {
      throw new Error('Network Error: Failed to connect to the server');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const cancelReservation = async (reservationId, cancellationReason) => {
  // ... (Existing code remains unchanged)
};

export const getCancellationRestrictions = async () => {
  // ... (Existing code remains unchanged)
};

export const runMatchingWithCriteria = async (matchingCriteria) => {
  // ... (Existing code remains unchanged)
};"