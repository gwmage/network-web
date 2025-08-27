```typescript
import { render, screen } from '@testing-library/react';
import ReservationNotifications from './ReservationNotifications';

describe('ReservationNotifications', () => {
  it('should render no notifications message when notifications array is empty', () => {
    render(<ReservationNotifications notifications={[]} />);
    expect(screen.getByText('No notifications yet.')).toBeInTheDocument();
  });

  it('should render notifications when notifications array is not empty', () => {
    const notifications = [
      { id: 1, message: 'Reservation confirmed!' },
      { id: 2, message: 'Reservation reminder: Your reservation is tomorrow.' },
    ];
    render(<ReservationNotifications notifications={notifications} />);
    expect(screen.getByText('Reservation confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Reservation reminder: Your reservation is tomorrow.')).toBeInTheDocument();
  });

  it('should render each notification with its corresponding message', () => {
    const notifications = [
      { id: 1, message: 'Test notification 1' },
      { id: 2, message: 'Test notification 2' },
    ];

    render(<ReservationNotifications notifications={notifications} />);
    expect(screen.getByText('Test notification 1')).toBeInTheDocument();
    expect(screen.getByText('Test notification 2')).toBeInTheDocument();
  });
});
```