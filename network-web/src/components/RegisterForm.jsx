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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const RegisterForm = ({ onSubmit }) => {
  // ... (rest of the component code)

  return (
    <FormContainer>
      {/* ... (form elements) */}
    </FormContainer>
  );
};

export default RegisterForm;

```