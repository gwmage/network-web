```typescript
import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';
import { registerUser } from '../services/AuthService';
import ErrorDisplay from './ErrorDisplay'; // Import the ErrorDisplay component

jest.mock('../services/AuthService');

describe('RegisterForm', () => {
  it('renders the form elements', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // Add more expectations for other form fields
  });

  it('validates email format', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput); // Trigger validation
    // Expect an error message to be displayed
     // You might need to adjust the selector based on your implementation
    expect(screen.getByText(/Invalid email format/i)).toBeVisible();


  });

  it('displays error messages from API', async () => {
    const errorMessage = 'Email already exists';
    (registerUser as jest.Mock).mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    render(<RegisterForm />);
    fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText(errorMessage)).toBeVisible();
  });


  it('handles successful registration', async () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
       ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));


    (registerUser as jest.Mock).mockResolvedValue({});
    render(<RegisterForm />);

    fireEvent.submit(screen.getByRole('form'));
    // Add assertions, e.g., check if navigate was called with the correct path

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });



  it('validates required fields', async () => {
    render(<RegisterForm />);

    fireEvent.submit(screen.getByRole('form'));



     // You might need to adjust the selector based on your implementation
    expect(screen.getByText(/Email is required/i)).toBeVisible();
    expect(screen.getByText(/Password is required/i)).toBeVisible();
    // Check for other required field error messages

  });


  it('handles unexpected errors', async () => {
    (registerUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));
    render(<RegisterForm />);
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByText(/An unexpected error occurred during registration./i)).toBeVisible();
  });

});

```