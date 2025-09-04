"import axios from 'axios';
import { getMatchingStatus, getMatchingResults, getMatchingExplanations, triggerMatching, getMatchingResultNotifications, updateNotificationStatus } from './api';
jest.mock('axios');

describe('API functions', () => {
  // ... existing tests

  it('getMatchingResultNotifications fetches notifications successfully', async () => {
    const mockNotifications = [{ id: 1, message: 'Match found!' }];
    axios.get.mockResolvedValueOnce({ data: mockNotifications });
    const notifications = await getMatchingResultNotifications(1); // Example userId
    expect(notifications).toEqual(mockNotifications);
    expect(axios.get).toHaveBeenCalledWith('/users/1/notifications/matching');
  });

  it('updateNotificationStatus updates status successfully', async () => {
    const mockResponse = { message: 'Notification status updated' };
    axios.put.mockResolvedValueOnce({ data: mockResponse });
    const response = await updateNotificationStatus(1, 'read'); // Example notificationId and status
    expect(response).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledWith('/notifications/1', { status: 'read' });
  });


  it('handles errors for all API calls', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValueOnce(mockError);
    axios.post.mockRejectedValueOnce(mockError);
    axios.put.mockRejectedValueOnce(mockError); // Add put for updateNotificationStatus

    await expect(getMatchingStatus()).rejects.toThrow(mockError);
    await expect(getMatchingResults()).rejects.toThrow(mockError);
    await expect(getMatchingExplanations()).rejects.toThrow(mockError);
    await expect(triggerMatching()).rejects.toThrow(mockError);
    await expect(getMatchingResultNotifications(1)).rejects.toThrow(mockError); // Test with userId
    await expect(updateNotificationStatus(1, 'read')).rejects.toThrow(mockError); // Test with notificationId and status
  });
});"