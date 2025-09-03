"import axios from 'axios';

const API_BASE_URL = '/auth'; // Updated base URL

// ... (Existing code)

export const loginUser = async (credentials) => {
  // ... (Existing code)
};

export const registerUser = async (userData) => {
  // ... (Existing code)
};

export const cancelReservation = async (reservationId, cancellationReason) => {
  // ... (Existing code remains unchanged)
};

export const getCancellationRestrictions = async () => {
  // ... (Existing code remains unchanged)
};

export const runMatchingWithCriteria = async (matchingCriteria) => {
  // ... (Existing code remains unchanged)
};

export const getMatchingStatus = async () => {
  try {
    const response = await axios.get('/matching/status');
    return response.data;
  } catch (error) {
    console.error('Error getting matching status:', error);
    throw error;
  }
};

export const getMatchingResults = async () => {
  try {
    const response = await axios.get('/matching/groups'); // Or /matching/results
    return response.data;
  } catch (error) {
    console.error('Error getting matching results:', error);
    throw error;
  }
};

export const getMatchingExplanations = async () => {
  try {
    const response = await axios.get('/matching/explanations');
    return response.data;
  } catch (error) {
    console.error('Error getting matching explanations:', error);
    throw error;
  }
};

export const triggerMatching = async () => {
  try {
    const response = await axios.post('/matching');
    return response.data;
  } catch (error) {
    console.error('Error triggering matching:', error);
    throw error;
  }
};

export const createApplication = async (applicationData) => {
  try {
    const response = await axios.post('/applications', applicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error; // Re-throw the error for handling in the component
  }
};"