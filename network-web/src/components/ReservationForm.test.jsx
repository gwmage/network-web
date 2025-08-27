```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReservationForm from './ReservationForm';

describe('ReservationForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    jest.clearAllMocks();
  });

  it('renders the form with correct fields', () => {
    expect(screen.getByLabelText('Restaurant')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is submitted', async () => {
    const restaurantInput = screen.getByLabelText('Restaurant');
    const dateInput = screen.getByLabelText('Date');
    const timeInput = screen.getByLabelText('Time');
    const guestsInput = screen.getByLabelText('Number of Guests');

    fireEvent.change(restaurantInput, { target: { value: 'Test Restaurant' } });
    fireEvent.change(dateInput, { target: { value: '2024-07-27' } });
    fireEvent.change(timeInput, { target: { value: '19:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      restaurant: 'Test Restaurant',
      date: '2024-07-27',
      time: '19:00',
      guests: '4',
    });
  });

  it('does not submit the form if any field is empty', () => {
      fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
      expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  })

    it('should display an error message if restaurant field is empty', async () => {
      fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-07-27' } });
      fireEvent.change(screen.getByLabelText('Time'), { target: { value: '19:00' } });
      fireEvent.change(screen.getByLabelText('Number of Guests'), { target: { value: '2' } });
      fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
      // Add specific error message checks here if implemented
    });
});

```