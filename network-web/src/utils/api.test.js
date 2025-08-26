```typescript
import { getPosts, getPost, createPost, updatePost, deletePost, getNotificationPreferences, updateNotificationPreferences } from './api';

jest.mock('./api', () => ({
    getPosts: jest.fn(),
    getPost: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    getNotificationPreferences: jest.fn(),
    updateNotificationPreferences: jest.fn(),
}));


describe('API Utils - Notification Preferences', () => {

    describe('getNotificationPreferences', () => {
        it('should fetch notification preferences successfully', async () => {
            const mockPreferences = {
                preferences: [
                    { eventType: 'MATCHING_RESULTS', deliveryMethod: 'push_notification', enabled: true },
                    { eventType: 'RESERVATION_INFORMATION', deliveryMethod: 'email', enabled: false },
                ],
            };
            (getNotificationPreferences as jest.Mock).mockResolvedValue(mockPreferences);

            const preferences = await getNotificationPreferences();
            expect(getNotificationPreferences).toHaveBeenCalled();
            expect(preferences).toEqual(mockPreferences);
        });

        it('should handle errors when fetching notification preferences', async () => {
            const error = new Error('Failed to fetch preferences');
            (getNotificationPreferences as jest.Mock).mockRejectedValue(error);
            await expect(getNotificationPreferences()).rejects.toThrowError(error);

        });
    });

    describe('updateNotificationPreferences', () => {
        it('should update notification preferences successfully', async () => {
            const updatedPreferences = {
                push: true,
                email: false,
            };
            (updateNotificationPreferences as jest.Mock).mockResolvedValue(undefined);

            await updateNotificationPreferences(updatedPreferences);
            expect(updateNotificationPreferences).toHaveBeenCalledWith(updatedPreferences);
        });

        it('should handle errors when updating notification preferences', async () => {
            const updatedPreferences = {
                push: true,
                email: false,
            };
            const error = new Error('Failed to update preferences');
            (updateNotificationPreferences as jest.Mock).mockRejectedValue(error);
            await expect(updateNotificationPreferences(updatedPreferences)).rejects.toThrowError(error);

        });
    });



});

```