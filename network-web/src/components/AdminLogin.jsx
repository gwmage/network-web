```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' }); // Use email instead of username
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setGeneralError(errorData.message || 'Invalid credentials');
        } else {
          console.error('Login failed:', errorData);
          setGeneralError('An error occurred during login.');
        }
      } else {
        const data = await response.json();
        localStorage.setItem('adminToken', data.accessToken); // Store accessToken
        console.log('Login successful:', data);
        navigate('/admin');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setGeneralError('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;

```