```typescript
import axios from 'axios';

const API_BASE_URL = '/api/community'; // Updated base URL

// ... (Existing code remains unchanged)

// User Management
export const getUsers = async () => {
  try {
    const response = await axios.get('/api/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post('/api/admin/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


// Matching Management
export const getAllGroups = async () => {
    try {
        const response = await axios.get('/api/admin/groups');
        return response.data;
    }
    catch (error) {
        console.error('Error getting all groups:', error);
        throw error;
    }
}

export const getGroupById = async (groupId) => {
    try {
        const response = await axios.get(`/api/admin/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting group by ID:', error);
        throw error;
    }
}



export const startMatching = async () => {
    try {
      const response = await axios.post('/api/matching');
      return response.data;
    } catch (error) {
      console.error('Error starting matching:', error);
      throw error;
    }
  };


// System Settings
export const getSystemSettings = async () => {
  try {
    const response = await axios.get('/api/admin/settings');
    return response.data;
  } catch (error) {
    console.error('Error getting system settings:', error);
    throw error;
  }
};

export const updateSystemSettings = async (settingsData) => {
  try {
    const response = await axios.put('/api/admin/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('Error updating system settings:', error);
    throw error;
  }
};

```