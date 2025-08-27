```typescript
import { getNotificationPreferences, updateNotificationPreferences, getNotificationStatus, getMatchingNotificationStatus, sendNotification } from './api';

jest.mock('./api', () => ({
    initiateMatching: jest.fn(),
    getMatchesForUser: jest.fn(),
    getMatchingStatus: jest.fn(),
    getNotificationPreferences: jest.fn(),
    updateNotificationPreferences: jest.fn(),
    getNotificationStatus: jest.fn(),
    getMatchingNotificationStatus: jest.fn(),
    sendNotification: jest.fn(),
}));

describe('API Utils - Notifications', () => {
    describe('getNotificationPreferences', () => {
        it('should fetch notification preferences successfully', async () => {
            const mockResponse = { email: true, push: false };
            (getNotificationPreferences as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getNotificationPreferences();
            expect(getNotificationPreferences).toHaveBeenCalled();
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when fetching preferences', async () => {
            const mockError = new Error('Failed to fetch preferences');
            (getNotificationPreferences as jest.Mock).mockRejectedValue(mockError);

            await expect(getNotificationPreferences()).rejects.toThrow(mockError);
        });
    });

    describe('updateNotificationPreferences', () => {
        it('should update notification preferences successfully', async () => {
            const preferences = { email: true, push: false };
            (updateNotificationPreferences as jest.Mock).mockResolvedValue({ message: 'Preferences saved successfully' });

            const response = await updateNotificationPreferences(preferences);
            expect(updateNotificationPreferences).toHaveBeenCalledWith(preferences);
            expect(response).toEqual({ message: 'Preferences saved successfully' });
        });

        it('should handle errors when updating preferences', async () => {
            const preferences = { email: true, push: false };
            const mockError = new Error('Failed to update preferences');
            (updateNotificationPreferences as jest.Mock).mockRejectedValue(mockError);

            await expect(updateNotificationPreferences(preferences)).rejects.toThrow(mockError);
        });
    });

    describe('getNotificationStatus', () => {
      it('should get notification status successfully', async () => {
          const mockResponse = { enabled: true, lastSent: '2024-07-28T12:00:00Z' };
          (getNotificationStatus as jest.Mock).mockResolvedValue(mockResponse);

          const response = await getNotificationStatus();
          expect(getNotificationStatus).toHaveBeenCalled();
          expect(response).toEqual(mockResponse);

      });
      it('should handle errors', async () => {
          const mockError = { status: 'error', message: 'Failed to retrieve notification status' };
          (getNotificationStatus as jest.Mock).mockRejectedValue(mockError);

          await expect(getNotificationStatus()).rejects.toEqual(mockError);

      });

    });
    describe('getMatchingNotificationStatus', () => {
        it('should get matching notification status successfully', async () => {
            const mockResponse = { status: 'pending', lastSent: '2024-07-28T12:00:00Z' };
            (getMatchingNotificationStatus as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getMatchingNotificationStatus();
            expect(getMatchingNotificationStatus).toHaveBeenCalled();
            expect(response).toEqual(mockResponse);

        });
        it('should handle errors', async () => {
            const mockError = { status: 'error', message: 'Failed to retrieve matching notification status' };
            (getMatchingNotificationStatus as jest.Mock).mockRejectedValue(mockError);

            await expect(getMatchingNotificationStatus()).rejects.toEqual(mockError);

        });
    });
    describe('sendNotification', () => {
        it('should send a notification successfully', async () => {
            (sendNotification as jest.Mock).mockResolvedValue({message: 'Notification sent successfully'});

            const response = await sendNotification();
            expect(sendNotification).toHaveBeenCalled();
            expect(response).toEqual({message: 'Notification sent successfully'});
        });

        it('should handle errors when sending notification', async () => {
            const mockError = { status: 'error', message: 'Failed to send notification' };
            (sendNotification as jest.Mock).mockRejectedValue(mockError);
            await expect(sendNotification()).rejects.toEqual(mockError);
        });
    });


});

```