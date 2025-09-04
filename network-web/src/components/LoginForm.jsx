import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/api';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGeneralError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user)); // Store user data
      navigate('/');
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (error.response.status === 401) {
          setGeneralError(errorData.message || 'Invalid credentials');
        } else if (error.response.status === 400) {
          setErrors(errorData);
        } else {
          console.error('Login failed:', errorData);
          setGeneralError('An error occurred during login.');
        }
      } else if (error.request) {
        setGeneralError('Network Error: Failed to connect to the server');
      } else {
        setGeneralError(`Request Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          required
          aria-label="Email"
        />
        {errors.email && <p className="error-message" role="alert">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
          required
          aria-label="Password"
        />
        {errors.password && <p className="error-message" role="alert">{errors.password}</p>}
      </div>

      {generalError && <p className="error-message" role="alert">{generalError}</p>}

      <button type="submit">Login</button>

      <Link to="/register">Don't have an account? Register here</Link>
      <Link to="/password-reset">Forgot Password?</Link>
    </form>
  );
};

export default LoginForm;