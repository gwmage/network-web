import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || "/api"; // Use relative path for api requests

// ... (other functions)

export const getSincheongJeongbo = async (userId, page = 1, limit = 10, sortBy = '', sortOrder = 'asc', searchTerm = '') => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
      search: searchTerm, // Add search term to parameters
    });

    const response = await axios.get(`${API_URL}/user/${userId}/sincheong-jeongbo?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching 신청 정보:', error);
    throw error;
  }
};

export const cancelReservation = async (reservationId, reason = '') => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${reservationId}`, {
      data: { cancellationReason: reason },
    });
    return response;
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    throw error;  // Re-throw the error for proper handling in the calling component
  }
};

// ... (other functions)