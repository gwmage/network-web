```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', { // Or '/auth/register' depending on your backend setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to login page on successful registration
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle error, e.g., display error messages to the user
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      // Handle error, e.g., display a generic error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form inputs ... */}
    </form>
  );
}

export default RegisterForm;

```