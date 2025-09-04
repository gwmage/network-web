import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import NotificationSettings from '../components/NotificationSettings';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('NotificationSettings', () => {
  const mockPreferences = {
    push_enabled: true,
    email_enabled: false,
    new_message_notifications: true,
    new_connection_notifications: false,
    matching_result_notifications: true,
    time_window_start: '09:00',
    time_window_end: '17:00',
  };

  beforeEach(() => {
    api.getNotificationPreferences.mockResolvedValue(mockPreferences);
  });

  it('renders correctly', async () => {
    render(<NotificationSettings />);
    expect(await screen.findByLabelText('Push Notifications')).toBeInTheDocument();
    expect(await screen.findByLabelText('Email Notifications')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('fetches and displays initial settings', async () => {
    render(<NotificationSettings />);
    expect(await screen.findByLabelText('Push Notifications')).toBeChecked();
    expect(await screen.findByLabelText('Email Notifications')).not.toBeChecked();
    expect(await screen.findByLabelText('New Messages')).toBeChecked();
    expect(await screen.findByLabelText('New Connection Requests')).not.toBeChecked();
    expect(await screen.findByLabelText('Matching Results')).toBeChecked();
    expect((await screen.findByLabelText('Start')).value).toBe('09:00');
    expect((await screen.findByLabelText('End')).value).toBe('17:00');


  });

  it('handles errors when fetching settings', async () => {
    const errorMessage = 'Failed to load settings';
    api.getNotificationPreferences.mockRejectedValue(new Error(errorMessage));
    render(<NotificationSettings />);
    expect(await screen.findByText(errorMessage)).toBeVisible();
  });

  it('saves settings correctly', async () => {
    api.updateNotificationPreferences.mockResolvedValue({});
    render(<NotificationSettings />);

    fireEvent.click(await screen.findByLabelText('Email Notifications'));
    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));

    expect(api.updateNotificationPreferences).toHaveBeenCalledWith({ ...mockPreferences, email_enabled: true });
  });


  it('handles saving errors', async () => {
    const errorMessage = 'Failed to save settings';
    api.updateNotificationPreferences.mockRejectedValue(new Error(errorMessage));
    render(<NotificationSettings />);

    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));

    expect(await screen.findByText(errorMessage)).toBeVisible();
  });

  it('disables save button while loading', async () => {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    api.updateNotificationPreferences.mockImplementation(() => promise);

    render(<NotificationSettings />);
    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeDisabled();

    resolvePromise({});
    await act(async () => {
      await promise;
    });
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeEnabled();
  });

  // ... other tests for event types and time window
});