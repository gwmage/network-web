import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// ... other API functions

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data; // Return both token and user data
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getMatchingVisualization = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/visualization/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matching visualization:', error);
    throw error;
  }
};


export const updateMatchingWeights = async (weights) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/matching/weights`, weights);
    return response.data;
  } catch (error) {
    console.error('Error updating matching weights:', error);
    throw error;
  }
};

export const getMatchingWeights = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matching/weights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matching weights:', error);
    throw error;
  }
};


// ... other API functions