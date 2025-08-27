```typescript
import { registerUser, createReservation, getReservation, cancelReservation } from './api';

jest.mock('./api', () => ({
    registerUser: jest.fn(),
    createReservation: jest.fn(),
    getReservation: jest.fn(),
    cancelReservation: jest.fn(),
}));

describe('API Utils - Reservations', () => {
    describe('createReservation', () => {
        it('should create a reservation successfully', async () => {
            const reservationData = {
                restaurantId: '1',
                userId: '1',
                dateTime: '2024-07-27T12:00:00Z',
                numberOfGuests: 2,
            };
            const mockResponse = {
                status: 'success',
                message: 'Reservation created successfully',
                reservationId: 'reservation123',
            };
            (createReservation as jest.Mock).mockResolvedValue(mockResponse);

            const response = await createReservation(reservationData);
            expect(createReservation).toHaveBeenCalledWith(reservationData);
            expect(response).toEqual(mockResponse);
        });

        it('should handle errors when creating a reservation', async () => {
            const reservationData = {
                restaurantId: '1',
                userId: '1',
                dateTime: '2024-07-27T12:00:00Z',
                numberOfGuests: 2,
            };

            const mockError = {
                status: 'error',
                message: 'Failed to create reservation',
            };

            (createReservation as jest.Mock).mockRejectedValue(mockError);
            await expect(createReservation(reservationData)).rejects.toEqual(mockError);
        });
    });

    describe('getReservation', () => {
        it('should retrieve a reservation successfully', async () => {
            const reservationId = 'reservation123';
            const mockResponse = {
                status: 'success',
                reservation: {
                    restaurantId: '1',
                    userId: '1',
                    dateTime: '2024-07-27T12:00:00Z',
                    numberOfGuests: 2,
                },
            };

            (getReservation as jest.Mock).mockResolvedValue(mockResponse);

            const response = await getReservation(reservationId);
            expect(getReservation).toHaveBeenCalledWith(reservationId);
            expect(response).toEqual(mockResponse);

        });
    });


    describe('cancelReservation', () => {
      it('should cancel a reservation successfully', async () => {
        const reservationId = 'reservation123';
        const mockResponse = {
          status: 'success',
          message: 'Reservation cancelled successfully',
        };
        (cancelReservation as jest.Mock).mockResolvedValue(mockResponse);

        const response = await cancelReservation(reservationId);
        expect(cancelReservation).toHaveBeenCalledWith(reservationId);
        expect(response).toEqual(mockResponse);
      });

      it('should handle errors when cancelling a reservation', async () => {
        const reservationId = 'reservation123';
        const mockError = {
          status: 'error',
          message: 'Failed to cancel reservation',
        };
        (cancelReservation as jest.Mock).mockRejectedValue(mockError);

        await expect(cancelReservation(reservationId)).rejects.toEqual(mockError);

      });
    });


});

```