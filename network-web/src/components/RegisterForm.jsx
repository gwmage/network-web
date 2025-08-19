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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear all errors before submitting

    try {
      const response = await fetch('/register', { // Or '/auth/register' depending on your backend setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);

        if (response.status === 400) {
          // Handle validation errors
          setErrors(errorData.errors || { general: 'Validation failed' }); // Assuming backend sends errors in 'errors' field. Adapt as needed.
        } else if (response.status === 409) {
          // Handle conflict error (e.g., duplicate email)
          setErrors({ email: 'Email already exists' }); 
        } else {
          // Handle other errors
          setErrors({ general: 'An error occurred during registration' });
        }
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setErrors({ general: 'An error occurred during registration' });
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* ... form inputs ... */}
      <input type="text" name="email" onChange={handleChange} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input type="password" name="password" onChange={handleChange} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

       {/* ... other form inputs and error displays ... */}
       {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;

```