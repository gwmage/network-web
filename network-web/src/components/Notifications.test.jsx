```typescript
import { render, screen, fireEvent, act } from '@testing-library/react';
import Notifications from './Notifications';
import * as api from '../utils/api';

jest.mock('../utils/api');

const mockGeneralNotifications = [
  { id: 1, type: 'general', message: 'General notification 1', read: false },
  { id: 3, type: 'general', message: 'General notification 2', read: true },
];

const mockMatchingNotifications = [
  { id: 2, type: 'match_result', message: 'Match Found!', data: { matchCount: 2 }, read: false },
];



describe('Notifications Component', () => {
  it('renders notifications correctly', async () => {
    api.getNotifications.mockResolvedValue(mockGeneralNotifications);
    api.getMatchingResultNotifications.mockResolvedValue(mockMatchingNotifications);

    render(<Notifications />);

    expect(await screen.findByText('General notification 1')).toBeInTheDocument();
    expect(await screen.findByText('Match Found!')).toBeInTheDocument();
    expect(await screen.findByText('Number of matches: 2')).toBeInTheDocument(); // Check match data


    expect(screen.getByText(/Mark as Read/)).toBeInTheDocument();
    expect(screen.getByText(/Dismiss/)).toBeInTheDocument();
  });

  it('handles mark as read', async () => {
    api.updateNotificationStatus.mockResolvedValue({});
    api.getNotifications.mockResolvedValue(mockGeneralNotifications);
    api.getMatchingResultNotifications.mockResolvedValue(mockMatchingNotifications);
    render(<Notifications />);


    await act(async () => {
      fireEvent.click(await screen.findAllByText(/Mark as Read/)[0]);
    });
    expect(api.updateNotificationStatus).toHaveBeenCalledWith(1, 'read');
    // Check that mark as read button is disabled for read notifications
    expect(screen.getAllByText(/Mark as Read/)[1]).toBeDisabled();
  });

  it('handles dismiss notification', async () => {
    api.getNotifications.mockResolvedValue(mockGeneralNotifications);
    api.getMatchingResultNotifications.mockResolvedValue(mockMatchingNotifications);
    render(<Notifications />);
    await act(async () => {
      fireEvent.click(await screen.findAllByText(/Dismiss/)[0]);
    });
     // Add assertions for state update after dismissal
  });

  it('displays no notifications message', async () => {
    api.getNotifications.mockResolvedValue([]);
    api.getMatchingResultNotifications.mockResolvedValue([]);
    render(<Notifications />);
    expect(await screen.findByText(/No notifications yet./)).toBeInTheDocument();
  });


  it('displays unread notification badge correctly', async () => {
    api.getNotifications.mockResolvedValue(mockGeneralNotifications); // 1 unread
    api.getMatchingResultNotifications.mockResolvedValue(mockMatchingNotifications); // 1 unread

    render(<Notifications />);
    expect(await screen.findByText('2')).toBeVisible(); // Expect badge to show '2'
  });
});

```