```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchingForm from './MatchingForm';
import MatchingProgress from './MatchingProgress'; // Assuming you have this component

jest.mock('./api', () => ({
  submitMatchingForm: jest.fn(),
}));

describe('MatchingForm', () => {
  it('renders the form elements', () => {
    render(<MatchingForm />);
    // Replace with your actual form element selectors
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows matching progress when submitting', async () => {
    render(<MatchingForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByRole('progressbar')).toBeVisible(); // Assuming MatchingProgress uses a progress bar
  });


  it('calls the API and handles success', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({});
    require('./api').submitMatchingForm = mockSubmit;

    render(<MatchingForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await expect(mockSubmit).toHaveBeenCalled();
    // Add assertions for successful submission, e.g., checking for a success message
  });


  it('calls the API and handles errors', async () => {
    const mockError = new Error('API Error');
    const mockSubmit = jest.fn().mockRejectedValue(mockError);
    require('./api').submitMatchingForm = mockSubmit;


    render(<MatchingForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await expect(mockSubmit).toHaveBeenCalled();
    // Add assertions for error handling, e.g., checking for an error message
    expect(screen.getByText(/error/i)).toBeVisible();
  });



  it('hides matching progress after submission', async () => {
    render(<MatchingForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await screen.findByText(/error/i); // Wait for either success or error message to avoid race conditions
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

  });
});

```