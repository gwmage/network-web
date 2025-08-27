```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReservationConfirmation } from './ReservationConfirmation';

describe('ReservationConfirmation', () => {
  it('should render null when no reservation is provided', () => {
    render(<ReservationConfirmation />);
    expect(screen.queryByRole('heading', { level: 3 })).toBeNull();
  });

  it('should render reservation details correctly', () => {
    const reservation = {
      restaurantId: '123',
      userId: '456',
      dateTime: '2024-07-27T12:00:00.000Z',
    };
    render(<ReservationConfirmation reservation={reservation} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Reservation Confirmed!'
    );
    expect(screen.getByText('Restaurant ID: 123')).toBeInTheDocument();
    expect(screen.getByText('User ID: 456')).toBeInTheDocument();
    expect(screen.getByText(/Date and Time:/)).toBeInTheDocument(); // Use regex for flexible date formatting
  });

  it('should render with different date format', () => {
        const reservation = {
          restaurantId: 'rest1',
          userId: 'user1',
          dateTime: '2025-08-15T18:30:00.000Z'
        }
        render(<ReservationConfirmation reservation={reservation} />);
        expect(screen.getByText(/Date and Tim/)).toBeInTheDocument();
      });
});

```