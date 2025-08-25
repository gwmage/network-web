```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const getMatchingGroups = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/matches/groups`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching matching groups:', error);
    throw error;
  }
};

// ... (Other functions remain unchanged)

```