```jsx
import React, { useState } from 'react';
import * as api from '../utils/api'; // Import the API functions
import MatchingProgress from './MatchingProgress';

const MatchingForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    preferences: '',
    interests: [],
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
        {/* ... form elements ... */}
        <button type="submit">Submit</button>
      </form>

      {matchingInProgress && <MatchingProgress />}
      {matchingError && <div>Error: {matchingError}</div>}
    </div>
  );
};

export default MatchingForm;

```