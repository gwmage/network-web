```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationSettings from '../components/NotificationSettings';
import * as api from '../api/user';

jest.mock('../api/user');

describe('NotificationSettings', () => {
  it('renders correctly', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);
    expect(await screen.findByLabelText('Email Notifications')).toBeInTheDocument();
    expect(await screen.findByLabelText('Push Notifications')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('fetches and displays initial settings', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);
    expect(await screen.findByLabelText('Email Notifications')).toBeChecked();
    expect(await screen.findByLabelText('Push Notifications')).not.toBeChecked();
  });

  it('handles errors when fetching settings', async () => {
    const errorMessage = 'Failed to load settings';
    api.getNotificationPreferences.mockRejectedValue(new Error(errorMessage));
    render(<NotificationSettings />);
    expect(await screen.findByText(errorMessage)).toBeVisible();
  });



  it('saves settings correctly', async () => {
    api.updateNotificationPreferences.mockResolvedValue({});
    api.getNotificationPreferences.mockResolvedValue({ email: false, push: false }); // Initial state
    render(<NotificationSettings />);

    fireEvent.click(await screen.findByLabelText('Email Notifications'));
    fireEvent.click(await screen.findByLabelText('Push Notifications'));

    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));

    expect(api.updateNotificationPreferences).toHaveBeenCalledWith({ email: true, push: true });

  });

  it('handles saving errors', async () => {
    const errorMessage = 'Failed to save settings';
    api.updateNotificationPreferences.mockRejectedValue(new Error(errorMessage));
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);

    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));

    expect(await screen.findByText(errorMessage)).toBeVisible();
  });


  it('disables save button while loading', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: true });
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    api.updateNotificationPreferences.mockImplementation(() => promise);



    render(<NotificationSettings />);
    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeDisabled();
    resolvePromise();
    await screen.findByRole('button', { name: /Save Settings/i, disabled: false });

  });
});
```