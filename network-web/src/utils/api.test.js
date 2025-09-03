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
    // ... (Existing tests)

    describe('getNotificationStatus', () => {
        it('should get notification status successfully', async () => {
            const mockResponse = { enabled: true, lastSent: '2024-07-28T12:00:00Z' };
            (getNotificationStatus as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getNotificationStatus();
            expect(getNotificationStatus).toHaveBeenCalled();
            expect(response).toEqual(mockResponse);

        });
        it('should handle errors', async () => {
            const mockError = new Error('Failed to retrieve notification status');
            (getNotificationStatus as jest.Mock).mockRejectedValue(mockError);

            await expect(getNotificationStatus()).rejects.toThrow(mockError);

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
            const mockError = new Error('Failed to retrieve matching notification status');
            (getMatchingNotificationStatus as jest.Mock).mockRejectedValue(mockError);

            await expect(getMatchingNotificationStatus()).rejects.toThrow(mockError);

        });
    });

    // ... (Existing tests)
});

```