```typescript
import React, { useState } from 'react';
import styled from 'styled-components';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../components/RegisterForm'; // Adjust path as needed
import axios from 'axios';



jest.mock('axios');

describe('RegisterForm', () => {
  it('renders the form correctly', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });


  it('validates email format', async () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput); // Trigger validation
    expect(screen.getByText('Invalid email format')).toBeVisible();
  });


  it('validates password length', async () => {
    render(<RegisterForm />);
    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, 'short');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('Password must be at least 8 characters')).toBeVisible();

  });

  it('validates required fields', async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Email is required')).toBeVisible();
    expect(screen.getByText('Password is required')).toBeVisible();
    expect(screen.getByText('Name is required')).toBeVisible();
    expect(screen.getByText('Phone Number is required')).toBeVisible();
  });

  it('calls onSubmit with correct data', async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const nameInput = screen.getByLabelText('Name');
    const phoneInput = screen.getByLabelText('Phone Number');


    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'Test1234');
    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(phoneInput, '123-456-7890');

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));


    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'Test1234',
      name: 'Test User',
      phoneNumber: '123-456-7890',
    });

  });

  it('handles successful API call', async () => {
    axios.post.mockResolvedValue({ status: 201 }); // Mock successful response

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'test@test.com');
    // ... other fields

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      // Add assertions to check the success state, e.g., a success message.
      expect(axios.post).toHaveBeenCalled();


    });
  });


  it('handles failed API call', async () => {
    axios.post.mockRejectedValue({ response: { status: 400, data: { message: 'Error' } } });

    render(<RegisterForm />);

    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'test@test.com');
    // ... other fields

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {

      expect(screen.getByText('Error')).toBeVisible();  // or similar error message

    });

  });



});
```