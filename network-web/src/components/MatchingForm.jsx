```jsx
import React, { useState } from 'react';
import * as api from '../utils/api'; // Import the API functions
import MatchingProgress from './MatchingProgress';

const MatchingForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    preferences: '',
    interests: [],
    weights: {
      location: 1,
      preferences: 1,
      interests: 1,
    },
  });
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [matchingError, setMatchingError] = useState(null);

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

  const handleWeightsChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      weights: {
        ...formData.weights,
        [name]: parseInt(value, 10),
      },
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setMatchingInProgress(true);
    setMatchingError(null);

    try {
      const response = await api.createUser(formData); // Use the API function
      console.log('User created:', response.data);
      // Trigger matching process after user creation (if needed)
      await api.triggerMatching();


    } catch (error) {
      console.error("Error creating user or triggering matching:", error);
      setMatchingError(error.message);
    } finally {
      setMatchingInProgress(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor="preferences">Preferences:</label>
        <input
          type="text"
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
          value={formData.interests.join(',')}
          onChange={handleInterestsChange}
        />

        <h3>Weights</h3>
        <label htmlFor="locationWeight">Location Weight:</label>
        <input
          type="number"
          id="locationWeight"
          name="location"
          value={formData.weights.location}
          onChange={handleWeightsChange}
          min="1"
          max="5"
        />

        <label htmlFor="preferencesWeight">Preferences Weight:</label>
        <input
          type="number"
          id="preferencesWeight"
          name="preferences"
          value={formData.weights.preferences}
          onChange={handleWeightsChange}
          min="1"
          max="5"
        />

        <label htmlFor="interestsWeight">Interests Weight:</label>
        <input
          type="number"
          id="interestsWeight"
          name="interests"
          value={formData.weights.interests}
          onChange={handleWeightsChange}
          min="1"
          max="5"
        />


        <button type="submit">Submit</button>
      </form>

      {matchingInProgress && <MatchingProgress />}
      {matchingError && <div>Error: {matchingError}</div>}
    </div>
  );
};

export default MatchingForm;

```