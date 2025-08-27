```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

const mockNotifications = [
  { id: 1, type: 'push', message: 'Push notification 1', read: false },
  { id: 2, type: 'email', message: 'Email notification 1', read: false },
  { id: 3, type: 'push', message: 'Push notification 2', read: true },
];

const mockMarkAsRead = jest.fn();
const mockDismissNotification = jest.fn();
const mockToggleSubscription = jest.fn();

describe('Notifications Component', () => {
  it('renders notifications correctly', () => {
    render(
      <Notifications
        notifications={mockNotifications}
        markAsRead={mockMarkAsRead}
        dismissNotification={mockDismissNotification}
        toggleSubscription={mockToggleSubscription}
      />
    );

    mockNotifications.forEach((notification) => {
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    });

    expect(screen.getByText(/Mark as Read/)).toBeInTheDocument();
    expect(screen.getByText(/Dismiss/)).toBeInTheDocument();
  });


  it('handles mark as read', () => {
    render(
      <Notifications
        notifications={mockNotifications}
        markAsRead={mockMarkAsRead}
        dismissNotification={mockDismissNotification}
        toggleSubscription={mockToggleSubscription}
      />
    );

    fireEvent.click(screen.getAllByText(/Mark as Read/)[0]);
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);


    // Check that mark as read button is disabled for read notifications
    expect(screen.getAllByText(/Mark as Read/)[2]).toBeDisabled();
  });

  it('handles dismiss notification', () => {
    render(
      <Notifications
        notifications={mockNotifications}
        markAsRead={mockMarkAsRead}
        dismissNotification={mockDismissNotification}
        toggleSubscription={mockToggleSubscription}
      />
    );

    fireEvent.click(screen.getAllByText(/Dismiss/)[0]);
    expect(mockDismissNotification).toHaveBeenCalledWith(1);
  });

  it('displays no notifications message', () => {
    render(
      <Notifications
        notifications={[]}
        markAsRead={mockMarkAsRead}
        dismissNotification={mockDismissNotification}
        toggleSubscription={mockToggleSubscription}
      />
    );

    expect(screen.getByText(/No notifications yet./)).toBeInTheDocument();
  });

  it('toggles subscription', () => {
    render(
      <Notifications
        notifications={mockNotifications}
        markAsRead={mockMarkAsRead}
        dismissNotification={mockDismissNotification}
        toggleSubscription={mockToggleSubscription}
      />
    );

    fireEvent.click(screen.getByText(/Push/i));
    expect(mockToggleSubscription).toHaveBeenCalledWith('push');

    fireEvent.click(screen.getByText(/Email/i));
    expect(mockToggleSubscription).toHaveBeenCalledWith('email');


  });

});

```