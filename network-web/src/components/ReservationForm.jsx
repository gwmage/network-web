```typescript
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%; /* Occupy most of the container width */
  max-width: 500px; /* Set a maximum width for larger screens */
  margin: 20px auto; /* Center the form */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
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


const ReservationForm = () => {
  const [dateTime, setDateTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to API
    console.log('Reservation submitted:', { dateTime, numberOfPeople });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dateTime">Date/Time:</label>
        <Input
          type="datetime-local"
          id="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />

        <label htmlFor="numberOfPeople">Number of People:</label>
        <Input
          type="number"
          id="numberOfPeople"
          min="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
          required
        />

        <Button type="submit">Make Reservation</Button>
      </form>
    </FormContainer>
  );
};

export default ReservationForm;
```