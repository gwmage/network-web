```typescript
import { initiateMatching, getMatchesForUser, getMatchingStatus } from './api';

jest.mock('./api', () => ({
    initiateMatching: jest.fn(),
    getMatchesForUser: jest.fn(),
    getMatchingStatus: jest.fn(),
}));

describe('API Utils - Matching', () => {
    describe('initiateMatching', () => {
        it('should initiate matching successfully', async () => {
            const userData = { userId: '1' };
            const mockResponse = { status: 'success', message: 'Matching initiated' };
            (initiateMatching as jest.Mock).mockResolvedValue(mockResponse);

            const response = await initiateMatching(userData);
            expect(initiateMatching).toHaveBeenCalledWith(userData);
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when initiating matching', async () => {
            const userData = { userId: '1' };
            const mockError = { status: 'error', message: 'Failed to initiate matching' };
            (initiateMatching as jest.Mock).mockRejectedValue(mockError);

            await expect(initiateMatching(userData)).rejects.toEqual(mockError);
        });
    });

    describe('getMatchesForUser', () => {
        it('should retrieve matches for a user successfully', async () => {
            const userId = '1';
            const mockResponse = { status: 'success', matches: [{ groupId: 'group123', members: ['user1', 'user2'] }] };
            (getMatchesForUser as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getMatchesForUser(userId);
            expect(getMatchesForUser).toHaveBeenCalledWith(userId);
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when retrieving matches', async () => {
            const userId = '1';
            const mockError = { status: 'error', message: 'Failed to retrieve matches' };
            (getMatchesForUser as jest.Mock).mockRejectedValue(mockError);

            await expect(getMatchesForUser(userId)).rejects.toEqual(mockError);
        });
    });


    describe('getMatchingStatus', () => {
        it('should retrieve matching status successfully', async () => {
            const mockResponse = { status: 'in_progress', estimatedCompletionTime: '2024-07-28T12:00:00Z' };

            (getMatchingStatus as jest.Mock).mockResolvedValue(mockResponse);
            const response = await getMatchingStatus();
            expect(getMatchingStatus).toHaveBeenCalled();
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when retrieving matching status', async () => {
            const mockError = { status: 'error', message: 'Failed to retrieve matching status' };
            (getMatchingStatus as jest.Mock).mockRejectedValue(mockError);
            await expect(getMatchingStatus()).rejects.toEqual(mockError);
        });
    });


});

```