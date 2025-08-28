```typescript
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService'; // Import your registration service
import ErrorDisplay from './ErrorDisplay';

// ... (rest of the file)

const [error, setError] = useState<string | null>(null);


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      navigate('/login'); // Redirect after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred during registration.');
      }

    }
  };

// ... (rest of the file)

      <ErrorDisplay error={error} />

// ... (rest of the file)

```