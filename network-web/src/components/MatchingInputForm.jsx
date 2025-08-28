```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MatchingInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    region: '',
    preferences: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const interestsArray = formData.interests.split(',').map((interest) => interest.trim());
    onSubmit({ ...formData, interests: interestsArray });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="region">Region:</label>
      <input
        type="text"
        id="region"
        name="region"
        value={formData.region}
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
        value={formData.interests}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

MatchingInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MatchingInputForm;
```