const API_URL = process.env.REACT_APP_API_URL || "YOUR_PRODUCTION_API_URL";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle successful deletion (e.g., return a success message)
    return 'Successfully deleted';
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error; // Re-throw for handling by the caller
  }
};
