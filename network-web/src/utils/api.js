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

// ... other API functions