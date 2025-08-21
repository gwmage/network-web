```typescript
import axios from 'axios';

const API_BASE_URL = '/api'; // Or your API base URL

// ... (Existing code remains unchanged)

export const adminLogin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, { username, password }, { withCredentials: true }); // withCredentials for HttpOnly cookies
    const { accessToken } = response.data;

    // Securely store the token (choose one method)
    // 1. localStorage (less secure, but simpler for demonstration)
    // localStorage.setItem('accessToken', accessToken);

    // 2. HttpOnly cookies (more secure, handled by 'withCredentials')
    // The cookie will be automatically stored by the browser due to the 'withCredentials' option.

    return accessToken; 
  } catch (error) {
    console.error('Admin login failed:', error);

    // Handle specific error messages (if available from the backend)
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // Re-throw the error with the backend message
    } else {
      throw new Error('Admin login failed. Please try again.'); // Generic error message
    }
  }
};


// ... (Other functions remain unchanged)

```