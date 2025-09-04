```js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// ... other API functions


export const removeUserFromGroup = async (groupId, userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/matching/groups/${groupId}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing user from group:", error);
        throw error;
    }
};


export const getMatchingCriteria = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/matching/criteria`);
      return response.data;
    } catch (error) {
      console.error('Error fetching matching criteria:', error);
      throw error;
    }
  };
  
  export const addMatchingCriterion = async (criterion) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/matching/criteria`, { criterion });
      return response.data;
    } catch (error) {
      console.error('Error adding matching criterion:', error);
      throw error;
    }
  };

  export const removeMatchingCriterion = async (criterion) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/matching/criteria/${criterion}`);
        return response.data;
      } catch (error) {
        console.error('Error removing matching criterion:', error);
        throw error;
      }
  };



// ... other API functions
```