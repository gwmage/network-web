```jsx
import React, { useState } from 'react';

const MatchingForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    preferences: '',
    interests: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestsChange = (event) => {
    const { value } = event.target;
    const interestsArray = value.split(',').map((interest) => interest.trim());
    setFormData({
      ...formData,
      interests: interestsArray,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <label htmlFor="preferences">Preferences:</label>
      <textarea
        id="preferences"
        name="preferences"
        value={formData.preferences}
        onChange={handleChange}
      />

      <label htmlFor="interests">Interests (comma-separated):</label>
      <input
        type="text"
        id="interests"
        name="interests"
        value={formData.interests.join(', ')}
        onChange={handleInterestsChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MatchingForm;
```