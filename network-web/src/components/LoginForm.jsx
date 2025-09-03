"import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();

        if (response.status === 401) {
          setGeneralError(errorData.message || 'Invalid credentials');
        } else {
          console.error('Login failed:', errorData);
          setGeneralError('An error occurred during login.');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setGeneralError('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" onChange={handleChange} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <input type="password" name="password" onChange={handleChange} />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

      <button type="submit">Login</button>

      <Link to="/register">Don't have an account? Register here</Link>
      <Link to="/password-reset">Forgot Password?</Link>
    </form>
  );
};

export default LoginForm;"