```typescript
import { registerUser } from './api';

jest.mock('./api', () => ({
    registerUser: jest.fn(),
}));

describe('API Utils - Auth', () => {
    describe('registerUser', () => {
        it('should register a user successfully', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'SecurePassword123',
                name: 'Test User',
                phoneNumber: '+15551234567',
            };
            const mockResponse = {
                status: 'success',
                message: 'User registered successfully',
                userId: 1,
            };
            (registerUser as jest.Mock).mockResolvedValue(mockResponse);

            const response = await registerUser(userData);
            expect(registerUser).toHaveBeenCalledWith(userData);
            expect(response).toEqual(mockResponse);
        });

        it('should handle validation errors', async () => {
            const userData = {
                email: 'invalid_email',
                password: 'short',
                name: '',
                phoneNumber: 'invalid_phone',
            };
            const mockError = {
                status: 'error',
                message: 'Validation failed',
                errors: {
                    email: ['Invalid email format'],
                    password: ['Password must be at least 8 characters'],
                    name: ['Name is required'],
                    phoneNumber: ['Invalid phone number format'],
                },
            };
            (registerUser as jest.Mock).mockRejectedValue(mockError);

            await expect(registerUser(userData)).rejects.toEqual(mockError);
        });

        it('should handle email already exists error', async () => {
            const userData = {
                email: 'existing@example.com',
                password: 'SecurePassword123',
                name: 'Test User',
                phoneNumber: '+15551234567',
            };
            const mockError = {
                status: 'error',
                message: 'Email already exists',
                errors: {
                    email: 'This email is already registered.',
                },
            };
            (registerUser as jest.Mock).mockRejectedValue(mockError);

            await expect(registerUser(userData)).rejects.toEqual(mockError);

        });

        it('should handle generic server errors', async () => {
          const userData = {
              email: 'test@example.com',
              password: 'SecurePassword123',
              name: 'Test User',
              phoneNumber: '+15551234567',
          };
          const mockError = new Error('Internal Server Error');
          (registerUser as jest.Mock).mockRejectedValue(mockError);

          await expect(registerUser(userData)).rejects.toThrowError(mockError);
      });


    });
});

```