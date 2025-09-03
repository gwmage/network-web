```typescript
import React, { useState } from 'react';
import styled from 'styled-components';

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
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Add shadow */

  @media (max-width: 768px) {
    width: 95%; /* Adjust width for smaller screens */
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px; /* Add margin */
`;

const Label = styled.label`
  margin-bottom: 5px; /* Add margin */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
    color: red;
    font-size: small;
    margin-top: -5px; /* Adjust position */
    margin-bottom: 10px; /* Add some bottom margin */
`;


const RegisterForm = ({ onSubmit }) => {
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


  // ... (rest of the component code)

  return (
    <FormContainer>
      <Label htmlFor="email">Email:</Label>
      <Input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <Label htmlFor="password">Password:</Label>
      <Input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}


      <Label htmlFor="name">Name:</Label>
      <Input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />
      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <Label htmlFor="phoneNumber">Phone Number:</Label>
      <Input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} />
      {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}


      <Button type="submit">Register</Button>
    </FormContainer>
  );
};

export default RegisterForm;

```