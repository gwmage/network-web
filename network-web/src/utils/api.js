```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const fetchMembers = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const searchMembers = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, { params: { search: query } });
    return response.data;
  } catch (error) {
    console.error('Error searching members:', error);
    throw error;
  }
};


export const sortMembers = async (sortBy, sortOrder) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, { params: { sortBy, sort: sortOrder } });
    return response.data;
  } catch (error) {
    console.error('Error sorting members:', error);
    throw error;
  }
};

export const editMember = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error editing member:', error);
    throw error;
  }
};

export const deleteMember = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

export const fetchMemberActivityHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/users/${userId}/activity`);
    return response.data;
  } catch (error) {
    console.error('Error fetching member activity history:', error);
    throw error;
  }
};


export const getCancellationRestrictions = async () => {
  // ... (Existing code remains unchanged)
};

export const runMatchingWithCriteria = async (matchingCriteria) => {
  // ... (Existing code remains unchanged)
};

```