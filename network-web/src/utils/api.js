```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your API base URL

// ... other existing functions

export const getApplications = async (page = 1, pageSize = 10, sortField = 'createdAt', sortOrder = 'DESC', filter = {}, keyword = '') => {
  try {
    const params = {
      page,
      pageSize,
      sortField,
      sortOrder,
      keyword,
      ...filter,
    };
    const response = await axios.get(`${API_BASE_URL}/applications`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export const getFilteredUsers = async (regions, interests) => {
  try {
    const params = {};
    if (regions && regions.length > 0) {
      params.regions = regions;
    }
    if (interests && interests.length > 0) {
      params.interests = interests;
    }

    const response = await axios.get(`${API_BASE_URL}/users`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered users:", error);
    throw error;
  }
};

export const triggerMatching = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matching`);
    return response.data;
  } catch (error) {
    console.error("Error triggering matching:", error);
    throw error;
  }
};
```