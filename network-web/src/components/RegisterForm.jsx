```typescript
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; /* Occupy most of the container width */
  max-width: 500px; /* Set a maximum width for larger screens */
  margin: 20px auto; /* Center the form */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  gap: 10px; /* Add some spacing between form elements */

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    padding: 15px; /* Adjust padding for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Further adjust padding for very small screens */
  }

  input, button {  /* Style form inputs and buttons */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box; /* Include padding and border in element's total width and height */
  }

  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border: none; /* Remove default button border */
  }

  button:hover {
    background-color: #0056b3;
  }

  .error { /* Style error messages */
    color: red;
    font-size: 0.8rem;
    margin-top: -5px;
    margin-bottom: 5px;
  }

  /* Add styles for labels or other form elements as needed */
`;

// ... (rest of the code remains the same)
```