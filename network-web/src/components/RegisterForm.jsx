import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: small;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '', // Contact information as phone number
    region: '',
    preferences: '',
    interests: ''
  });
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

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const nameRegex = /^.+$/;
    const phoneRegex = /^.+$/; // Basic validation for now, can be more specific


    const newErrors = {};
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!passwordRegex.test(formData.password)) newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number and symbol.';
    if (!nameRegex.test(formData.name)) newErrors.name = 'Name is required.';
    if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setErrors(data.errors || data); // Use error object from backend
          setGeneralError(data.message || 'Registration failed. Please check your input.');
        } else {
            setGeneralError(data.message || 'A server error occurred.');

        }
      } else if (error.request) {
        setGeneralError('Network error. Please check your connection.');
      } else {
        setGeneralError('An error occurred during registration.');
      }
    }
  };


  return (
    <FormContainer>
      <Label htmlFor="email">Email:</Label>
      <Input type="email" id="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your email" required />
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <Label htmlFor="password">Password:</Label>
      <Input type="password" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter your password" required />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}

      <Label htmlFor="name">Name:</Label>
      <Input type="text" id="name" name="name" onChange={handleChange} value={formData.name} placeholder="Enter your name" required />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <Label htmlFor="phoneNumber">Phone Number:</Label>
      <Input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Enter your phone number" required />
      {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}

        <Label htmlFor="region">Region:</Label>
      <Input type="text" id="region" name="region" onChange={handleChange} value={formData.region} placeholder="Enter your region" required />
      {errors.region && <ErrorText>{errors.region}</ErrorText>}

        <Label htmlFor="preferences">Preferences:</Label>
      <Input type="text" id="preferences" name="preferences" onChange={handleChange} value={formData.preferences} placeholder="Enter your preferences" required />
      {errors.preferences && <ErrorText>{errors.preferences}</ErrorText>}

        <Label htmlFor="interests">Interests:</Label>
      <Input type="text" id="interests" name="interests" onChange={handleChange} value={formData.interests} placeholder="Enter your interests" required />
      {errors.interests && <ErrorText>{errors.interests}</ErrorText>}


      {generalError && <ErrorText>{generalError}</ErrorText>}

      <Button type="submit" onClick={handleSubmit}>Register</Button>
    </FormContainer>
  );
};

export default RegisterForm;