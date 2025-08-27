```typescript
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import NotificationSettings from '../components/NotificationSettings';
import * as api from '../utils/api';

jest.mock('../utils/api');

describe('NotificationSettings', () => {
  it('renders correctly', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);
    expect(await screen.findByLabelText('Email')).toBeInTheDocument();
    expect(await screen.findByLabelText('Push')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('fetches and displays initial settings', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);

    expect(await screen.findByLabelText('Email')).toBeChecked();
    expect(await screen.findByLabelText('Push')).not.toBeChecked();
    expect(await screen.findByLabelText('None')).not.toBeChecked();
  });

  it('handles errors when fetching settings', async () => {
    const errorMessage = 'Failed to load settings';
    api.getNotificationPreferences.mockRejectedValue(new Error(errorMessage));
    render(<NotificationSettings />);
    expect(await screen.findByText(errorMessage)).toBeVisible();
  });

  it('saves settings correctly', async () => {
    api.updateNotificationPreferences.mockResolvedValue({});
    api.getNotificationPreferences.mockResolvedValue({ email: false, push: false });
    render(<NotificationSettings />);

    fireEvent.click(await screen.findByLabelText('Email'));
    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));

    expect(api.updateNotificationPreferences).toHaveBeenCalledWith({ email: true, push: false });
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
    resolvePromise({});
    await act(async () => {
      await promise;
    });

    expect(await screen.findByRole('button', { name: /Save Settings/i })).toBeEnabled();
  });

  it('updates notification method state correctly', async () => {
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);
    await act(async () => {
      fireEvent.click(await screen.findByLabelText('Push'));
    });
    expect(await screen.findByLabelText('Push')).toBeChecked();
    expect(await screen.findByLabelText('Email')).not.toBeChecked();
    expect(await screen.findByLabelText('None')).not.toBeChecked(); // Ensure None is not checked
  });

  it('updates notifications enabled state correctly', async () => {
    api.updateNotificationPreferences.mockResolvedValue({});
    api.getNotificationPreferences.mockResolvedValue({ email: true, push: false });
    render(<NotificationSettings />);
    await act(async () => {
      fireEvent.click(await screen.findByLabelText('None'));
    });

    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));
    expect(api.updateNotificationPreferences).toHaveBeenCalledWith({ email: false, push: false });
  });

  it('updates email only state correctly', async () => {
    api.updateNotificationPreferences.mockResolvedValue({});
    api.getNotificationPreferences.mockResolvedValue({ email: false, push: true });
    render(<NotificationSettings />);

    await act(async() => {
      fireEvent.click(await screen.findByLabelText('Email'));
    });

    fireEvent.click(await screen.findByRole('button', { name: /Save Settings/i }));
    expect(api.updateNotificationPreferences).toHaveBeenCalledWith({ email: true, push: false });
  })
});
```