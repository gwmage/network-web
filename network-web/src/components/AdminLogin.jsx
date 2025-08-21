```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
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
        // Store the token or perform other actions
        localStorage.setItem('adminToken', data.accessToken);
        console.log('Login successful:', data);
        navigate('/admin'); // Redirect to admin dashboard
      }

    } catch (error) {
      console.error('An error occurred:', error);
      setGeneralError('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} />
      {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

      <input type="password" name="password" onChange={handleChange} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
```