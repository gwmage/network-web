import axios from 'axios';

// ... other API functions

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // Return both token and user data
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};


export const cancelReservation = async (reservationId, cancellationReason) => {
  try {
    const response = await axios.delete(`/reservations/${reservationId}`, { data: { cancellationReason } });
    return response.data;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error; // Re-throw to handle in component
  }
};

export const getLoggedInUser = async () => {
  try {
    const response = await axios.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put('/auth/me', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};


export const getMatchingStatus = async () => {
  try {
    const response = await axios.get('/matching/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching matching status:', error);
    throw error;
  }
};

export const getMatchingResults = async () => {
  try {
    const response = await axios.get('/matching/results');
    return response.data;
  } catch (error) {
    console.error('Error fetching matching results:', error);
    throw error;
  }
};

export const getMatchingExplanations = async () => {
  try {
    const response = await axios.get('/matching/explanations');
    return response.data;
  } catch (error) {
    console.error('Error fetching matching explanations:', error);
    throw error;
  }
};

export const triggerMatching = async () => {
  try {
    await axios.post('/matching');
  } catch (error) {
    console.error('Error triggering matching:', error);
    throw error;
  }
};

export const getMatchingProgress = async () => {
  try {
    const response = await axios.get('/matching/progress');
    return response.data;
  } catch (error) {
    console.error('Error fetching matching progress:', error);
    throw error;
  }
};

export const getMatchingGroups = async () => {
  try {
    const response = await axios.get('/matching/groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching matching groups:', error);
    throw error;
  }
};

export const getNotificationDeliveryStatus = async () => {
  try {
    const response = await axios.get('/notifications/status');
    return response.data;
  } catch (error) {
    console.error('Error getting notification delivery status:', error);
    throw error;
  }
};

// ... other API functions