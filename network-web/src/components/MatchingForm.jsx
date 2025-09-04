import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function MatchingForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataWithUuid = { ...formData, id: uuidv4() };
    onSubmit(dataWithUuid);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default MatchingForm;
