export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, data, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json(); // Attempt to parse error response
      const errorMessage = errorData?.message || `HTTP error ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const createApplication = async (applicationData) => {
  return postData('/applications', applicationData);
};


export const cancelReservation = async (reservationId, reason = '') => {
  try {
    await fetchData(`/reservation/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cancellationReason: reason }),
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;
  }
};