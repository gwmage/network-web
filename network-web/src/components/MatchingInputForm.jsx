```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MatchingInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    region: '',
    preferences: '',
    interests: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.region) {
      newErrors.region = 'Region is required';
    }
    if (formData.interests && formData.interests.split(',').some(interest => !interest.trim())) {
      newErrors.interests = 'Interests must be comma-separated and cannot contain empty values';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
      />
      {errors.region && <p style={{ color: 'red' }}>{errors.region}</p>}

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
      {errors.interests && <p style={{ color: 'red' }}>{errors.interests}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

MatchingInputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default MatchingInputForm;
```