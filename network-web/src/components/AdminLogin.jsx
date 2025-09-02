// File: network-web/src/components/AdminLogin.jsx
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
        localStorage.setItem('adminToken', data.accessToken);
        console.log('Login successful:', data);
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setGeneralError('An error occurred during login.');
    }
  };

  // ... rest of the component code ...
};

export default AdminLogin;
